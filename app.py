from flask import Flask, render_template
from api.routes import api
import os

app = Flask(__name__)
app.register_blueprint(api, url_prefix="/api")

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
