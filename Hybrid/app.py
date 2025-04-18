from flask import Flask, request, jsonify,Response
import json

app = Flask(__name__)

# 기본 홈 페이지 라우트
@app.route('/')
def home():
    return "Welcome to the Flask API!"

# GET 요청을 받는 엔드포인트 (데이터 반환)
@app.route('/posts', methods=['GET'])
def get_posts():
    posts = [
        {"id": 1, "title": "첫 번째 포스트"},
        {"id": 2, "title": "두 번째 포스트"},
    ]
    # ensure_ascii=False 로 한글 깨짐 방지
    response = Response(
        response=json.dumps(posts, ensure_ascii=False),
        status=200,
        mimetype="application/json"
    )
    response.headers["Content-Type"] = "application/json; charset=utf-8"
    return response

# POST 요청을 받는 엔드포인트
@app.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()  # 클라이언트에서 보낸 JSON 데이터 받기
    
    # 받은 데이터 출력 (여기서 데이터 처리 및 DB 저장을 할 수 있음)
    print("Received data:", data)
    # 성공적으로 처리한 경우, 응답을 반환
    response = Response(
        response=json.dumps({"message": "Post created successfully", "data": data}, ensure_ascii=False),
        status=201,
        mimetype="application/json"
    )
    
    
    response.headers["Content-Type"] = "application/json; charset=utf-8"
    return response
# ------------------------------------


if __name__ == '__main__':
    app.run(debug=True)
