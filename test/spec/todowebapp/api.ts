import { Ensure, equals } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import { GetRequest, LastResponse, PostRequest, Send } from '@serenity-js/rest';

/**
 * Learn more about API testing with Serenity/JS
 *  https://serenity-js.org/handbook/api-testing/
 */
export class api {
    private static readonly baseApiUrl = 'http://localhost:8000/';
    private static readonly getRootUrl = this.baseApiUrl + '';
    private static readonly getTodoUrl = this.baseApiUrl + 'todo';
    private static readonly postAddTodoUrl = this.baseApiUrl + 'todo';

    static postAddTodo = () => 
        Task.where(`#actor ensures method POST add new Todo are operational`,
            Send.a(PostRequest.to(this.postAddTodoUrl).with({
                item: "Post an API! example"
            })),
            Ensure.that(LastResponse.status(), equals(200)),
        )
    
    static getRoot = () =>
        Task.where(`#actor ensures method GET Roots Todos are operational`,
            Send.a(GetRequest.to(this.getRootUrl)),
            Ensure.that(LastResponse.status(), equals(200)),
            Ensure.that(
                LastResponse.body<getRootResponseJSON>().message.describedAs('Get API Root'),
                equals('Welcome to your todo list.')
            )
        )
    
    static getTodoList = () =>
        Task.where(`#actor ensures method GET Todos are operational`,
            Send.a(GetRequest.to(this.getTodoUrl)),
            Ensure.that(LastResponse.status(), equals(200)),
            Ensure.that(
                LastResponse.body<getTodoListResponseJSON>().data[0].item.describedAs('1st Todo List'),
                equals('Read a book.')
            ),
            Ensure.that(    
                LastResponse.body<getTodoListResponseJSON>().data[1].item.describedAs('2nd Todo List'),
                equals('Cycle around town.')
            ),
        )
}

/**
 * Interfaces describing a simplified response structure returned
 */
interface getRootResponseJSON {
    message: string
}

interface getTodoListResponseJSON {
    data: Daum[]
}
interface Daum {
    id: string
    item: string
}

interface postAddTodoResponseJSON {
    data: string
}
  
