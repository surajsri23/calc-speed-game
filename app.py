from flask import Flask, render_template

from api.routes import api

# ================= CREATE APP =================

app = Flask(

    __name__,

    template_folder="templates",

    static_folder="static"

)

# ================= REGISTER BLUEPRINT =================

app.register_blueprint(api)

# ================= MAIN ROUTE =================

@app.route("/")

def index():

    return render_template("index.html")

# ================= RUN APP =================

if __name__ == "__main__":

    print("⚡ Calc Speed Challenge Running...")

    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True

    )