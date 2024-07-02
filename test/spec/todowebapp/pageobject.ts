import { includes } from '@serenity-js/assertions';
import { Answerable, d, QuestionAdapter } from '@serenity-js/core';
import { By, PageElement, PageElements, Text } from '@serenity-js/web';

export class App {
    static header = () => 
        PageElement.located(By.xpath("//h1[text()[contains(.,'Todos')]]"))
            .describedAs('Web Header Todos')
    static inputTodo = () => 
        PageElement.located(By.xpath("//input[@placeholder='Add a todo item']"))
            .describedAs('Input field todo list')
    static txt1stTodoItem = () => 
        PageElement.located(By.xpath("//*[contains(text(),'Read a book.')]"))
            .describedAs('1st todo item text ')
    static btn1stRowUpdateTodo = () => 
        PageElement.located(By.xpath("(//button[contains(text(),'Update Todo')])[1]"))
            .describedAs('button for update 1st todo list')
    static btn1stRowDeleteTodo = () => 
        PageElement.located(By.xpath("(//button[contains(text(),'Delete Todo')])[1]"))
            .describedAs('button for delete 1st todo list')
    static txt2ndTodoItem = () => 
        PageElement.located(By.xpath("//*[contains(text(),'Cycle around town.')]"))
            .describedAs('2nd todo item text')
    static btn2ndRowUpdateTodo = () => 
        PageElement.located(By.xpath("(//button[contains(text(),'Update Todo')])[2]"))
            .describedAs('button for update 2nd todo list')
    static btn2ndRowDeleteTodo = () => 
        PageElement.located(By.xpath("(//button[contains(text(),'Delete Todo')])[2]"))
            .describedAs('button for delete 2nd todo list')
    static txt3rdTodoItem = () => 
        PageElement.located(By.xpath("//*[contains(text(),'Feed the cat.')]"))
            .describedAs('3rd todo item text ')
    static txt3rdUpdatedTodoItem = () => 
        PageElement.located(By.xpath("//*[contains(text(),'Feed the white cat.')]"))
            .describedAs('3rd updated todo item text ')        
    static btn3rdRowUpdateTodo = () => 
        PageElement.located(By.xpath("(//button[contains(text(),'Update Todo')])[3]"))
            .describedAs('button for update 3rd todo list')
    static btn3rdRowDeleteTodo = () => 
        PageElement.located(By.xpath("(//button[contains(text(),'Delete Todo')])[3]"))
            .describedAs('button for delete 3rd todo list')        
}

export class PopUpUpdateTodo {
    static header = () => 
        PageElement.located(By.xpath("//header[text()[contains(.,'Update Todo')]]"))
            .describedAs('Popup Header Update Todos')
    static inputTodo = () => 
        PageElement.located(By.xpath("(//input[@placeholder='Add a todo item'])[2]"))
            .describedAs('Popup input field todo list')
    static btnUpdateTodo = () =>
        PageElement.located(By.xpath("(//button[contains(text(),'Update Todo')])[4]"))
            .describedAs('Popup button update todo list')
}