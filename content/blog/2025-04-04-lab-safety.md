---
title: "연구실 안전교육 스킵"
date: 2025-04-04 00:00:00 +09:00
tags: [Web]
category: Tip
giscus_comments: true
---


<article class="page sans" id="331451cf-7b79-8097-8e4f-e16b617eb2a5"><header><p class="page-description" dir="auto"></p></header><div class="page-body"><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-801a-b076-ca96e205193e">국가 돈낭비 중 하나인 연구실 안전교육을 아마 매학기 해야하는데 정말 귀찮다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8090-b018-e53d34dba4b6">특히 컴공은 정말 쓸데없는 듯 하다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8072-a24a-ecb27526446e">
</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8017-b644-c559151d1fe1">알 사람은 알지만 스킵하는 방법이 있다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80bf-8360-c8d1cef9b365">
</p></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8027-9163-d293c2b9e7d5">1. 동영상 틀기</h3></div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-80e1-8f03-c48088314a20" style="text-align:left"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/lab-safety/image.webp" style="width: 54.08%; height: auto;"/></figure></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8069-82c1-dfaa05aece5e">
</p></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8030-b3b4-c9618bb244db">2. 개발자 모드 진입</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8098-ad5c-d803ff740e4f">Window : <code>F12</code> </p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8002-9771-e85d6c1e008f">Mac : <code>cmd+opt+I</code> </p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80a0-b42a-eb20780af512">
</p></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-800f-a2b6-cf3b17dcc969">3. Console 창 진입</h3></div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-8064-897d-c42e5d6d173c" style="text-align:left"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/lab-safety/image 1.webp" style="width: 100%; height: auto;"/></figure></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8014-b1db-d916e6ea1ba5">
</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80ad-8dec-ed2ac765a5ff">
</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80d2-9df9-c272300b64ca">이제 Console 창에 아래 내용을 붙여넣기 하고 <code>Enter</code> 누르면 된다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-802d-98da-e67eec0e412c">
</p></div><div dir="auto" style="display:contents"><ul class="toggle" id="331451cf-7b79-8081-abe7-d1216c34d545"><li><details><summary>만약 Console에 붙여넣기가 불가능하다고 뜬다면?</summary><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-804b-8257-c1eafa3bd609">다음 내용을 직접 타이핑으로 입력 후 <code>Enter</code></p></div><div dir="auto" style="display:contents">

```javascript
allow pasting
```

</div></details></li></ul></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80ee-90bb-c9deed3f7907">
</p></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-801b-b9eb-c9a9b79d2cf2">4-1. ProgressCheck (바로 종료)</h3></div><div dir="auto" style="display:contents">

```javascript
progressCheck(true)
```

</div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8000-8c44-ec05b6a6fe73"><br/>4-2. 6000초 건너뛰기 (바로 종료)</h3></div><div dir="auto" style="display:contents">

```javascript
document.querySelector('video').currentTime+=6000;
```

</div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80b5-b67d-f50c5641c108">
</p></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-804b-aa16-e02db2d21eac">4-3. 16배속 (위 건너뛰기 방법이 안된다면)</h3></div><div dir="auto" style="display:contents">

```javascript
document.querySelector('video').playbackRate = 16;
```

</div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8015-8a23-f0e0c17edc42">
</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-806e-94cb-e063ee5d9bbe">
</p></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80c0-b404-e4d94550c0fb">5. 퀴즈 정답</h3></div><div dir="auto" style="display:contents">

```javascript
for (var i = 0; i < 10; i++){
	answer = $("#qustionCorrectNo_" + i).val();
	$("input[name='qustionAnswerList["+i+"].Answer']:radio[value="+answer+"]").attr("checked", true);
}
```

</div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-8087-ad11-e111157dd084"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/lab-safety/image 2.webp" style="width: 100%; height: auto;"/></figure></div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-8057-bdc0-c46b64f3886b"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/lab-safety/image 3.webp" style="width: 87.89%; height: auto;"/></figure></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8090-a5c2-fe8be9728c5f">
</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-804a-a685-e7cc0ecff9ea">
</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-808d-8693-d92c50921e67">
</p></div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-80f9-9850-e20c14917489"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/lab-safety/image 4.webp" style="width:709.984375px"/></figure></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8023-8a9f-f2ce6d275208">
</p></div></div></article><span class="sans" style="font-size:14px;padding-top:2em"></span>