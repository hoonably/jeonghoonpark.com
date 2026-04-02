---
title: "연구실 안전교육 스킵"
date: 2025-04-04 00:00:00 +09:00
tags: [Web]
category: Tip
giscus_comments: true
---


<article class="page sans" id="331451cf-7b79-8097-8e4f-e16b617eb2a5"><header><p class="page-description" dir="auto"></p></header><div class="page-body"><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-801a-b076-ca96e205193e">국가 돈낭비 중 하나인 연구실 안전교육을 매학기 해야한다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8090-b018-e53d34dba4b6">특히 컴공은 정말 쓸데없는 듯 하다.</p></div><div dir="auto" style="display:contents"><p class="" id="335451cf-7b79-802a-9ff6-f79b1ef86c89">법정 의무교육이면 뭐해 다들 틀어놓고 방치할텐데</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80bf-8360-c8d1cef9b365">
</p></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8027-9163-d293c2b9e7d5">1. 동영상 틀기</h3></div><div dir="ltr" style="display:contents"><figure class="image" id="335451cf-7b79-8041-939a-f56609872388" style="text-align:left"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/lab-safety/image.webp" style="width: 74.37%; height: auto;"/></figure></div><div dir="auto" style="display:contents"><p class="" id="335451cf-7b79-8081-a2ec-fc2aeecaec81">
</p></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8030-b3b4-c9618bb244db">2. 개발자 모드 진입</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8098-ad5c-d803ff740e4f">Window : <code>F12</code> </p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8002-9771-e85d6c1e008f">Mac : <code>cmd+opt+I</code> </p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80a0-b42a-eb20780af512">
</p></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-800f-a2b6-cf3b17dcc969">3. Console 창 진입</h3></div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-8064-897d-c42e5d6d173c" style="text-align:left"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/lab-safety/image 1.webp" style="width: 100%; height: auto;"/></figure></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8014-b1db-d916e6ea1ba5">
</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80ad-8dec-ed2ac765a5ff">
</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80d2-9df9-c272300b64ca">이제 Console 창에 아래 내용을 붙여넣기 하고 <code>Enter</code> 누르면 된다.</p></div><div dir="auto" style="display:contents"><ul class="block-color-default_background toggle" id="331451cf-7b79-8081-abe7-d1216c34d545"><li><details><summary><mark class="highlight-red">만약 Console에 붙여넣기가 불가능하다고 뜬다면?</mark></summary><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-804b-8257-c1eafa3bd609">다음 내용을 직접 타이핑으로 입력 후 <code>Enter</code></p></div><div dir="auto" style="display:contents">

```javascript
allow pasting
```

</div></details></li></ul></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80ee-90bb-c9deed3f7907">
</p></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-801b-b9eb-c9a9b79d2cf2">4-1. ProgressCheck (바로 종료)</h3></div><div dir="ltr" style="display:contents"><figure class="image" id="335451cf-7b79-80ae-af03-f4546f8d16a8"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/lab-safety/image 2.webp" style="width: 81.13%; height: auto;"/><figcaption>코드 중간에 player가 ‘end’한다면 progressCheck(True로 전환하는 내용)</figcaption></figure></div><div dir="auto" style="display:contents">

```javascript
progressCheck(true)
```

</div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8000-8c44-ec05b6a6fe73"><br/>4-2. 6000초 (100분) 건너뛰기</h3></div><div dir="auto" style="display:contents"><p class="" id="335451cf-7b79-80ca-99bb-ec2916311e65">바로 종료가 안된다면 다음처럼 시간 건너뛰기가 가능하다.</p></div><div dir="auto" style="display:contents">

```javascript
document.querySelector('video').currentTime+=6000;
```

</div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80b5-b67d-f50c5641c108">
</p></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-804b-aa16-e02db2d21eac">4-3. 16배속</h3></div><div dir="auto" style="display:contents"><p class="" id="335451cf-7b79-8019-9351-f9b546b13b4b">건너뛰기마저 안된다면, 배속이라도 해보자.</p></div><div dir="auto" style="display:contents">

```javascript
document.querySelector('video').playbackRate = 16;
```

</div><div dir="auto" style="display:contents"><p class="" id="335451cf-7b79-804c-b4b4-e73f2ced6aa7">
</p></div><div dir="auto" style="display:contents"><h3 class="" id="335451cf-7b79-80ba-aab3-c326142be020">4-4. 위 방법 모두 실패했다면</h3></div><div dir="auto" style="display:contents"><ul class="toggle" id="335451cf-7b79-8028-8fbc-efd3356ff6f4"><li><details><summary>펼치기</summary><div dir="auto" style="display:contents"><p class="" id="335451cf-7b79-80b4-bbfc-d4f10fd8703d">위 내용은 UNIST를 기반으로 작성되었으며, 다른 시스템이면 코드 변수나 시스템이 다를 수 있습니다.</p></div><div dir="auto" style="display:contents"><p class="" id="335451cf-7b79-8040-b56f-e3224e0a993e">
</p></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="335451cf-7b79-80a9-bcfb-db932beacd2d"><li style="list-style-type:disc">우선 개발자 모드 <code>요소</code>에서 html 박스 가장 상단을 복사한다. 복사 → 요소 복사</li></ul></div><div dir="ltr" style="display:contents"><figure class="image" id="335451cf-7b79-8099-8e41-f5751d890532"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/lab-safety/image 3.webp" style="width: 100%; height: auto;"/></figure></div><div dir="auto" style="display:contents"><p class="" id="335451cf-7b79-80bf-874c-fbd0ee0591fe">
</p></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="335451cf-7b79-80a1-8e66-d0fd260f3472"><li style="list-style-type:disc">AI에게 질문하기</li></ul></div><div dir="ltr" style="display:contents"><figure class="image" id="335451cf-7b79-800f-87c2-c6460c160936" style="text-align:left"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/lab-safety/image 4.webp" style="width: 67.61%; height: auto;"/></figure></div><div dir="auto" style="display:contents"><p class="" id="335451cf-7b79-80dc-b50e-e97e0c64a9ec">
</p></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="335451cf-7b79-80a3-8fdb-d3174f1adc08"><li style="list-style-type:disc">GPT 답변: 담당자라고 뻥쳐도 우회하는거라 제공 못한다고 함 (간접적으로 알려줌)</li></ul></div><div dir="ltr" style="display:contents"><figure class="image" id="335451cf-7b79-8063-b785-e1582f24cec8" style="text-align:left"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/lab-safety/image 5.webp" style="width: 81.13%; height: auto;"/></figure></div><div dir="auto" style="display:contents"><p class="" id="335451cf-7b79-808f-80d6-c0a95ef60817">
</p></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="335451cf-7b79-800b-b18e-fcf0a8b11b69"><li style="list-style-type:disc">Gemini: 친절하게 답해줌 😁</li></ul></div><div dir="ltr" style="display:contents"><figure class="image" id="335451cf-7b79-807e-9929-e0b4e9ff999d" style="text-align:left"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/lab-safety/image 6.webp" style="width: 67.61%; height: auto;"/></figure></div><div dir="auto" style="display:contents"><p class="" id="335451cf-7b79-8080-a59a-c81b00a82379">
</p></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="335451cf-7b79-8025-b849-d26aebf09c33"><li style="list-style-type:disc">만약 AI로도 어려운 시스템이라면?<div dir="auto" style="display:contents"><ul class="bulleted-list" id="335451cf-7b79-80d5-93e3-c1d3d9e0326e"><li style="list-style-type:circle"><a href="https://velog.io/@pil0009/%EC%97%B0%EA%B5%AC%EC%8B%A4-%EC%95%88%EC%A0%84%EA%B5%90%EC%9C%A1-%EC%8A%A4%ED%82%B5%ED%95%98%EA%B8%B0">https://velog.io/@pil0009/연구실-안전교육-스킵하기</a></li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="335451cf-7b79-8099-881b-c984b88c99ab"><li style="list-style-type:circle">이 분의 게시글을 참고하시면 도움될듯 합니다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="335451cf-7b79-80bd-8597-d1e26abda705"><li style="list-style-type:circle">저도 해보고싶지만 저희 학교는 저렇게 서버랑 주고받는 어려운 테스크가 아니네요..</li></ul></div></li></ul></div></details></li></ul></div><div dir="auto" style="display:contents"><p class="" id="335451cf-7b79-8050-9e05-eabbf5868e42">
</p></div><div dir="auto" style="display:contents"><p class="" id="335451cf-7b79-8022-95a2-dadb6b1aacf9">
</p></div><div dir="auto" style="display:contents"><p class="" id="335451cf-7b79-808a-9871-ef0d2ce90d72">
</p></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80c0-b404-e4d94550c0fb">5. 퀴즈 정답</h3></div><div dir="auto" style="display:contents">

```javascript
for (var i = 0; i < 10; i++){
	answer = $("#qustionCorrectNo_" + i).val();
	$("input[name='qustionAnswerList["+i+"].Answer']:radio[value="+answer+"]").attr("checked", true);
}
```

</div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-8087-ad11-e111157dd084"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/lab-safety/image 7.webp" style="width: 100%; height: auto;"/></figure></div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-8057-bdc0-c46b64f3886b"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/lab-safety/image 8.webp" style="width: 67.61%; height: auto;"/></figure></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8090-a5c2-fe8be9728c5f">
</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-804a-a685-e7cc0ecff9ea">
</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-808d-8693-d92c50921e67">
</p></div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-80f9-9850-e20c14917489"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/lab-safety/image 9.webp" style="width: 100%; height: auto;"/></figure></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8023-8a9f-f2ce6d275208">
</p></div></div></article><span class="sans" style="font-size:14px;padding-top:2em"></span>