import connection, bcrypt, requests


# @connection.connection_handler
# def question_vote(cursor,question_id, vote):
#     cursor.execute(f"""
#                             UPDATE question
#                             SET vote_number = vote_number+{vote}
#                             WHERE id = {question_id};
#                             """)
#
#
# @connection.connection_handler
# def get_question_id(cursor,answer_id):
#     cursor.execute(f"""
#                         SELECT question_id FROM answer
#                         WHERE id = {answer_id};
#                     """)
#     question_id = cursor.fetchone()
#     return  question_id['question_id']


@connection.connection_handler
def confirm_user(cursor, usrname):
    cursor.execute(f"""
                    SELECT user_name FROM users
                    WHERE user_name = '{usrname}'; 
                    """)
    result = cursor.fetchall()
    if result != []:
        return True
    else:
        return False


@connection.connection_handler
def check_credentials(cursor, user):
    cursor.execute(f"""
                    SELECT password FROM users
                    WHERE user_name = '{user}';
                    """)
    result = cursor.fetchone()
    return result

def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)

@connection.connection_handler
def get_username_id(cursor, usrname):
    cursor.execute(f'''
                        SELECT id FROM users
                        WHERE user_name = '{usrname}';
                        ''')
    result=cursor.fetchone()
    return result['id']

@connection.connection_handler
def get_username_by_id(cursor,id):
    cursor.execute(f'''
                        SELECT user_name FROM users
                        WHERE id = '{id}';
                    ''')
    result=cursor.fetchone()
    return result['username']

@connection.connection_handler
def insert_to_votes(cursor, planet, user_id):
    cursor.execute(f"""
                    INSERT INTO planet_votes (planet_name, user_id)
                    VALUES('{planet}',{user_id});
                    """)

@connection.connection_handler
def get_planets_and_votes(cursor):
    cursor.execute(f"""
                    SELECT DISTINCT planet_name, count(planet_name) AS Votes  FROM planet_votes GROUP BY planet_name;
                    """)
    result = cursor.fetchall()
    return result

@connection.connection_handler
def check_user_if_votes(cursor, planet, user):
    cursor.execute(f"""
                    SELECT id FROM planet_votes WHERE planet_name='{planet}' AND user_id={user};
                    """)
    result = cursor.fetchall()
    return result