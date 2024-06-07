# How to run

## 1. Setup database

Must have MySQL installed
We did all development locally so each of our machines were essentially MySQL servers we connect to.

### Steps
1. Create a database named `d2project`.
2. Created a user named `d2project` with password `Hths1234!` which can access the previously made database.


## 2. Django Backend
1. Install all necessary Python packages with `pip install -r requirements.txt`.
2. Navigate to the `backend` directory in a terminal and do `python manage.py runserver` (may have to do `python manage.py makemigrations` and `python manage.py migrate` beforehand).

## 3. React Frontend
1. Navigate to the `frontend` directory.
2. Install all necessary Node packages with `npm install`.
3. Run the frontend with `npm run dev`.
