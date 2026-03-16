from flask import Flask, render_template, request
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression

app = Flask(__name__)

# Load dataset
data = pd.read_csv("dataset/sentiment_data.csv")

X = data["text"]
y = data["label"]

# Convert text into numerical vectors
vectorizer = CountVectorizer()
X_vector = vectorizer.fit_transform(X)

# Train model
model = LogisticRegression()
model.fit(X_vector, y)


@app.route("/", methods=["GET", "POST"])
def home():
    result = ""

    if request.method == "POST":
        user_text = request.form["text"]
        text_vector = vectorizer.transform([user_text])
        prediction = model.predict(text_vector)
        result = prediction[0]

    return render_template("index.html", sentiment=result)


if __name__ == "__main__":
    app.run(debug=True)