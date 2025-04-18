Todo 개선점

1. idRef.current 불러오는 방법 reduce 함수를 사용하여 개선
2. onDelete 에서도 async await 적용
3. useTodos 커스텀훅 분리
4. shouldRerender 대신 fetchTodos() + useCallback 을 사용하여 데이터 패치 명시적 호출

# Todo 애플리케이션

## 주요 기능

### 1. Todo 타입별 관리

- **일반 Todo**: 기본적인 할 일 관리
- **긴급 Todo**: 24시간 데드라인 설정 및 기한 임박 알림
- **중요 Todo**: 우선순위 표시 및 강조 표시

### 2. 디자인 패턴 적용

- **싱글톤 패턴**: TodoStore를 통해 전역 상태 관리
- **팩토리 패턴**: Todo 타입별 객체 생성 로직 캡슐화
- **옵저버 패턴**: 상태 변경 시 자동 UI 업데이트

### 3. UI/UX 기능

- Todo 타입별 시각적 구분 (색상, 스타일)
- 우선순위 표시 (긴급, 중요, 일반)
- 기한 임박 알림
- 검색 기능
- 체크박스로 완료 표시

## 기술 스택

- React
- CSS3
- 디자인 패턴 (싱글톤, 팩토리, 옵저버)

## 설치 및 실행

```bash
npm install
npm run dev
```
