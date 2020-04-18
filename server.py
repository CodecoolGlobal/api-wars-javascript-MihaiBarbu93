import data_manager, util

from flask import Flask, render_template, request, redirect, url_for, session, escape, flash, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def main_page():
    if 'username' in session:
        return render_template('index.html', user_id=util.get_username_id(session['username']),username=session['username'])
    return render_template('index.html')

@app.route('/voting_st', methods=['GET'])
def votes():
    planetsVotes = util.get_planets_and_votes()
    print(planetsVotes)
    planets = []
    votes = []
    for planet in planetsVotes:
        planets.append(planet['planet_name'])
        votes.append(planet['votes'])
    jsonResp = {'planet': planets, 'votes': votes}
    return jsonify(jsonResp)

@app.route('/vote/<planet>', methods=['GET','POST'])
def add_vote(planet):
    user = util.get_username_id(session['username'])
    util.insert_to_votes(planet, user)
    return redirect(url_for('main_page'))

@app.route('/registration', methods=['GET', 'POST'])
def registration():
    if request.method == 'POST':
        name = request.form['username']
        password = request.form['psw']
        password = util.hash_password(password)
        data_manager.insert_user(name, password)
        return redirect(url_for('main_page'))
    return render_template('registration.html')

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        if util.confirm_user(request.form['uname']):
            session['username'] = request.form['uname']
            session['password'] = request.form['psw']
            passs = util.check_credentials(session['username'])['password']
            if util.verify_password(session['password'], passs):
                return redirect(url_for('main_page'))
        return redirect(url_for('main_page'))


@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return redirect(url_for('main_page'))

if __name__ == '__main__':
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    app.run(
        debug=True
    )