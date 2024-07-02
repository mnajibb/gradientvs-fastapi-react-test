import { not } from '@serenity-js/assertions';
import { describe, it } from '@serenity-js/playwright-test';
import { App, PopUpUpdateTodo } from './todowebapp/pageobject';
import { Wait } from '@serenity-js/core';
import { Navigate, isVisible } from '@serenity-js/web';
import { Click, Enter, Key, Press } from '@serenity-js/web';
import { api } from './todowebapp/api';



describe('Testing', () => {

    describe('React App Todo Pages', () => {

        it('should check the element of the page - Component Testing', async ({ actorCalled }) => {
            await actorCalled('Najib').attemptsTo(
                Navigate.to('/'),
                Wait.until(App.header(), isVisible()),
                Wait.until(App.inputTodo(), isVisible()),
                Wait.until(App.txt1stTodoItem(), isVisible()),
                Wait.until(App.btn1stRowUpdateTodo(), isVisible()),
                Wait.until(App.btn1stRowDeleteTodo(), isVisible()),
                Wait.until(App.txt2ndTodoItem(), isVisible()),
                Wait.until(App.btn2ndRowUpdateTodo(), isVisible()),
                Wait.until(App.btn2ndRowDeleteTodo(), isVisible())
            );
        });

        it('should be able to add new todo items - Functionality Testing', async ({ actorCalled }) => {
            await actorCalled('Najib').attemptsTo(
                Navigate.to('/'),
                Wait.until(App.inputTodo(), isVisible()),
                Enter.theValue("Feed the cat.").into(App.inputTodo()),
                Press.the(Key.Enter).in(App.inputTodo()),
                Wait.until(App.txt3rdTodoItem(), isVisible())
            );
        });

        it('should be able to update todo items - E2E Test - Functionality Testing', async ({ actorCalled }) => {
            await actorCalled('Najib').attemptsTo(
                Navigate.to('/'),
                Wait.until(App.inputTodo(), isVisible()),
                Wait.until(App.btn3rdRowUpdateTodo(), isVisible()),
                Click.on(App.btn3rdRowUpdateTodo()),
                // wait until update pop-up modal appear
                Wait.until(PopUpUpdateTodo.header(), isVisible()),
                Enter.theValue("Feed the white cat.").into(PopUpUpdateTodo.inputTodo()),
                Click.on(PopUpUpdateTodo.btnUpdateTodo())
            );
        });

        it('should be able to delete the updated todo list - E2E Test - Functionality Testing', async ({ actorCalled }) => {
            await actorCalled('Najib').attemptsTo(
                Navigate.to('/'),
                Wait.until(App.inputTodo(), isVisible()),
                Wait.until(App.btn3rdRowUpdateTodo(), isVisible()),
                Click.on(App.btn3rdRowDeleteTodo()),
                // wait until todo list deleted successfully
                Wait.until(App.txt3rdUpdatedTodoItem(), not(isVisible()))
            );
        });

        it('should check api functionality', async ({ actorCalled }) => {
            // You can use API interactions to manage test data, or to ensure services are up and running before performing any UI checks.
            await actorCalled('Najib').attemptsTo(
                api.getRoot(),
                api.getTodoList(),
                api.postAddTodo()
            );
        });
    });
});
