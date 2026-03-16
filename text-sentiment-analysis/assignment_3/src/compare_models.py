import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Embedding, LSTM, Flatten

# Load dataset
data = pd.read_csv("../dataset/sentiment_data.csv")

texts = data["text"]
labels = data["label"]

# Convert labels to numbers
encoder = LabelEncoder()
labels = encoder.fit_transform(labels)

# Text tokenization
tokenizer = Tokenizer(num_words=1000)
tokenizer.fit_on_texts(texts)

sequences = tokenizer.texts_to_sequences(texts)

X = pad_sequences(sequences, maxlen=10)

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, labels, test_size=0.2, random_state=42
)

# --------------------------
# Dense Network Model
# --------------------------

dense_model = Sequential()

dense_model.add(Embedding(1000, 16, input_length=10))
dense_model.add(Flatten())
dense_model.add(Dense(16, activation="relu"))
dense_model.add(Dense(1, activation="sigmoid"))

dense_model.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy"]
)

dense_model.fit(X_train, y_train, epochs=10, verbose=0)

dense_loss, dense_acc = dense_model.evaluate(X_test, y_test)

print("Dense Model Accuracy:", dense_acc)

# --------------------------
# RNN Model (LSTM)
# --------------------------

rnn_model = Sequential()

rnn_model.add(Embedding(1000, 16, input_length=10))
rnn_model.add(LSTM(16))
rnn_model.add(Dense(1, activation="sigmoid"))

rnn_model.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy"]
)

rnn_model.fit(X_train, y_train, epochs=10, verbose=0)

rnn_loss, rnn_acc = rnn_model.evaluate(X_test, y_test)

print("RNN Model Accuracy:", rnn_acc)

# --------------------------
# Comparison
# --------------------------

print("\nModel Comparison")
print("---------------------")
print("Dense Accuracy :", dense_acc)
print("RNN Accuracy   :", rnn_acc)