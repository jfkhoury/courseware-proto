import Router from "react-router";
import ReactDOM from "react-dom";
import React from "react";
import { App } from "spak";
import { ProvidedAppDelegate } from "spak/providers";
import { component, inject } from "spak/decorators";
import { SpecRegistration, ActionSpec } from "spak-di";
import DIBuilder from "spak-di/lib/DIBuilder";
import StorageComponent from "@yuzu/storage";
import DashboardComponent from "@app/dashboard";
import routes from "./routes";

var appPresenter = {
    loadApp() {
        App.dispatchAction("loadDashboard", { presenter: this });
    },
    showApp() {
        var router = Router.create({ routes });
        var root = document.querySelector("main");
        router.run((Handler) => {
            ReactDOM.render(<Handler />, root);
        });
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
