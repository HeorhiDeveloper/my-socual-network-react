import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from './ProfileStatus';

describe("Button component", () => {
    test("status from props should be in the state", () => {
        //создание копии
        const component = create(<ProfileStatus status="Hello my friend"/>);
        //экземпляр объекта взаимодействия
        const instance = component.getInstance();
        expect(instance.state.status).toBe("Hello my friend");
    });
});
