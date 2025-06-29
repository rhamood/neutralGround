from flask import Flask, request, jsonify
from newspaper import Article
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/parse-article": {"origins": "*"}})


@app.route('/parse-article', methods=['POST'])
def parse_article():
    data = request.json
    url = data.get('url')
    if not url:
        return jsonify({'error': 'No URL provided'}), 400
    try:
        article = Article(url)
        article.download()
        article.parse()
        return jsonify({
            'title': article.title,
            'text': article.text
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(port=5000, debug=True)
