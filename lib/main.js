import ReactDOM from "react-dom";
import React from "react";
import { App } from "spak";
import { ProvidedAppDelegate } from "spak/providers";
import { component, inject } from "spak/decorators";
import { SpecRegistration, ActionSpec } from "spak-di";
import DIBuilder from "spak-di/lib/DIBuilder";

class ViewLastCourse {
    exec({ presenter }) {
        var lastOpenedCourse = "Course A";
        presenter.showLastCourse(lastOpenedCourse);
    }
}

@component("dashboard")
class DashboardComponent {
    register() {
        return new SpecRegistration(
            new ActionSpec("viewLastCourse", ViewLastCourse)
        );
    }
}

var Dashboard = ({ courseTitle }) => {
    return (
        <div className="dashboard">
            <h1>Tasks:</h1>
            You need to finish this course ASAP: {courseTitle}.
        </div>
    );
};

var appPresenter = {
    loadApp() {
        App.dispatchAction("viewLastCourse", { presenter: this });
    },
    showLastCourse(courseTitle) {
        ReactDOM.render(<Dashboard courseTitle={courseTitle}/>, document.querySelector("main"));
    }
};

App.run(
    new App.Components(
        new DashboardComponent()
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
