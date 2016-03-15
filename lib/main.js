import ReactDOM from "react-dom";
import React from "react";
import { App } from "spak";
import { ProvidedAppDelegate } from "spak/providers";
import { component, inject } from "spak/decorators";
import { SpecRegistration, ActionSpec } from "spak-di";
import DIBuilder from "spak-di/lib/DIBuilder";
import StorageComponent from "@yuzu/storage";

@inject("stores")
class LoadDashboard {
    constructor(stores) {
        this._stores = stores;
    }

    exec({ presenter }) {
        this._loadStores();
        var lastOpenedCourse = "Course A";
        presenter.showLastCourse(lastOpenedCourse);
    }

    _loadStores() {
        App.session().isAuthenticated = true; // storage loadAll checks if authenticated.
        this._stores.loadAll();
    }
}

@component("dashboard")
class DashboardComponent {
    register() {
        return new SpecRegistration(
            new ActionSpec("loadDashboard", LoadDashboard)
        );
    }
}

var Dashboard = ({ courseTitle }) => {
    return (
        <div className="dashboard">
            <h1>Tasks:</h1>
            <p>Pick up where you left off: {courseTitle}.</p>
        </div>
    );
};

var appPresenter = {
    loadApp() {
        App.dispatchAction("loadDashboard", { presenter: this });
    },
    showLastCourse(courseTitle) {
        ReactDOM.render(<Dashboard courseTitle={courseTitle}/>, document.querySelector("main"));
    }
};

App.run(
    new App.Components(
        new DashboardComponent(),
        new StorageComponent()
    ),
    new App.Config(),
    new ProvidedAppDelegate({
        createSpecsBuilder() {
            return new DIBuilder();
        },
        onReady() {
            appPresenter.loadApp();
        }
    })
);
