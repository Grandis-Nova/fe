<!--
[타입] #이슈번호 제목 (이슈 번호를 포함하면 자동 링크가 걸려 편리함)
ex) [feat] #18 장바구니에 결제 정보 요약(리모컨) 추가
-->

## 📌 관련 이슈

- close #이슈번호

## ✨ 작업 내용

<!-- 어떤 변경 사항이 있었는지 주요 내용을 적어주세요. -->

- `entities/order`에 결제 정보 요약 카드(`OrderSummary`) 추가
- `entities/cart`의 `CartItem` 타입에서 합계 계산을 위해 `priceLabel`(문자열)을 `price`(숫자)로 변경
- `MypageCart` 위젯에 리모컨을 연결해 선택한 상품의 합계를 표시

## 📸 스크린샷 / 확인 결과

<!-- 화면 변경이면 스크린샷을, 컴포넌트 변경이면 Storybook 캡처나 play 함수 통과 결과를 첨부해주세요. -->

- 데스크톱/모바일 캡처 (`npm run dev`)
- `MypageCart.stories.tsx`의 `SelectAll` play 함수 통과 확인 (`npm run storybook`)

## 🔍 리뷰 포인트

<!-- 리뷰어가 집중해서 봐주었으면 하는 부분이 있다면 적어주세요. -->

- FSD 레이어 경계(`entities` → `widgets` → `pages`)를 벗어난 import가 없는지
- `shared/config/theme`의 색상·spacing·typography 토큰 대신 값을 직접 적은 곳은 없는지
- 이미 있는 컴포넌트(`shared/ui`, 관련 `entities/*`)와 겹치는 걸 새로 만들지 않았는지

## ✅ 체크리스트

- [ ] 커밋 메시지 컨벤션(`type: 요약` 또는 `type(이슈 키): 요약`)을 준수했는가? (`commit-msg` 훅이 자동으로 막는다)
- [ ] `npm run build`(`tsc -b` + `vite build`)와 `npm run lint`가 통과했는가?
- [ ] 변경한 컴포넌트의 Storybook 스토리를 추가/갱신했는가? (이 프로젝트엔 별도 테스트 러너가 없어 스토리가 사실상의 회귀 테스트다)
- [ ] 불필요한 주석이나 `console.log`를 제거했는가?

<!--
CodeRabbit이 오탐으로 머지를 막으면: PR에 `skip-review` 라벨을 달거나(그 PR의 자동 리뷰를 끈다),
관리자에게 우회 머지를 요청한다. 지적 자체가 틀렸다고 판단되면 리뷰 코멘트에 이유를 남겨 반박한다.
-->
