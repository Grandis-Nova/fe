// 이 저장소의 실제 커밋 관례(`feat: 설명`, 스코프 없이)를 강제한다.
// @commitlint/config-conventional은 스코프를 허용하고 subject-case를 영문 기준으로
// 검사하는데, 둘 다 여기 관례와 맞지 않아 규칙으로 덮어쓴다.
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'style', 'docs', 'design', 'chore', 'test'],
    ],
    // type(scope): 형태를 금지한다 — `type:` 만 허용.
    'scope-empty': [2, 'always'],
    // 커밋 메시지가 한글이라 영문 대소문자 규칙은 의미가 없다.
    'subject-case': [0],
  },
}
