import time
from datetime import datetime

import connection


@connection.connection_handler
def read_from_table(cursor, table):
    cursor.execute(f"""SELECT * FROM {table};""")
    name = cursor.fetchall()
    return name


@connection.connection_handler
def write_to_plannets(cursor, planet_id, planet_name,user_id=None):
    vote_number = 1
    submission_time = time.time()
    submission_time = datetime.utcfromtimestamp(submission_time).strftime('%Y-%m-%d %H:%M:%S')
    image = 'None'
    cursor.execute("""
                        INSERT INTO question (submission_time, view_number, vote_number, title, message, image, user_id) VALUES(%s, %s, %s, %s, %s, %s, %s);
                        """, (submission_time, view_number, vote_number, title, message, image,user_id))




@connection.connection_handler
def insert_user(cursor, name, password):
    cursor.execute("""
                        INSERT INTO users (user_name, password)
                        VALUES (%s,%s);
                        """,(name,password))