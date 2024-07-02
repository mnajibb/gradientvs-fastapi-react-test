# Developing a Single Page App with FastAPI and React

### Want to learn how to build this?

Check out the [post](https://testdriven.io/blog/fastapi-react/).

## Want to use this project?

1. Fork/Clone

1. Run the server-side FastAPI app in one terminal window:

   ```sh
   $ cd backend
   $ python3 -m venv venv
   $ source venv/bin/activate
   (venv)$ pip install -r requirements.txt
   (venv)$ python main.py
   ```

   Navigate to [http://localhost:8000](http://localhost:8000)
   
   API documentation [http://localhost:8000/docs](http://localhost:8000/docs)

1. Run the client-side React app in a different terminal window:

   ```sh
   $ cd frontend
   $ npm install
   $ npm run start
   ```

   Navigate to [http://localhost:3000](http://localhost:3000)

## Want to run test on this project?

1. Run the unit test using Jest from terminal window:

   ```sh
   npm test --prefix frontend/
   ```

1. Run automated test using serenityjs playwright

   ```sh
   npm test --prefix test/
   ```

1. You can see the playwright report after test has been finished on current main repo dir > test > playwright report > index.html

1. You can also see the serenityjs report after test has been finished on current main repo dir > test > target > site > serenity > index.html

