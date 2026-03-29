---
title: "[Java] String, StringBuffer, StringBuilder, BufferedWriter 비교"
date: 2023-11-27 00:00:00 +09:00
tags: [Java]
category: Study
giscus_comments: true
---


<article class="page sans" id="331451cf-7b79-8018-b2c3-fb4b7d8f2099"><header><p class="page-description" dir="auto"></p></header><div class="page-body"><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80eb-8c8b-e270800c71f9">String 이란?</h3></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80a9-bdeb-cf0085675612"><li style="list-style-type:disc">java.lang에 있다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8082-8e8b-e957498507e5"><li style="list-style-type:disc">한번 정해지면 변경불가능한 <code>불변(immutable) 클래스</code>다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8020-9333-f12338282cf8"><li style="list-style-type:disc">String 객체가 생성되면 그 값은 변경되는게 아니라 새로운 객체로 추가 및 변경이 된다.</li></ul></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-8098-8adc-e12d396a2860"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8070-ba9c-e2e9cbde2e46">StringBuffer 란?</h3></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8059-a10f-d044454f8bde"><li style="list-style-type:disc">java.lang에 있다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8068-b954-cb72e1d95026"><li style="list-style-type:disc">StringBuffer는 변경이 가능한 <code>가변(mutable) 클래스</code>다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80bd-aa84-de24ca871cdf"><li style="list-style-type:disc">멀티 쓰레드 환경에서 동시에 같은 문자열 인스턴스에 접근할 때 <strong>중복 점유를 막을 수 있는 장치</strong>가 되어 있다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80e2-8805-ea3df0a16776"><li style="list-style-type:disc">위의 장치 때문에 <strong>동기화 과정에서 성능 저하</strong>가 발생할 수 있다.</li></ul></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-806b-a896-c1a8d8d997d8"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8027-9f4d-d5d094300c70">StringBuilder 란?</h3></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-800a-8b42-cc5b94c086a6"><li style="list-style-type:disc">java.lang에 있다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8092-8232-d8f86dc161ae"><li style="list-style-type:disc">StringBuilder는 변경이 가능한 <code>가변(mutable) 클래스</code>이다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80d3-9353-e5b9d6a52b0c"><li style="list-style-type:disc">멀티쓰레드 환경에서 불안정적이지만 일반적 환경에서는 StringBuffer처럼 동기화로 인한 성능저하가 일어나지 않기 때문에 <code>가장 빠르다.</code></li></ul></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-807e-8b29-ef4d7f9b3396"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80d9-8c02-f52c77b2a142">BufferedWriter 란?</h3></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-801e-a9e7-f9e04ff74b40"><li style="list-style-type:disc">java.io에 있다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8073-9d41-f7529533552b"><li style="list-style-type:disc">선언이 필요하다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8062-a799-ce7d6cf55ec8"><li style="list-style-type:disc">throws Exception 예외처리가 필요하다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-803e-af0c-d53c29b00408"><li style="list-style-type:disc">버퍼를 잡아 놓았기 때문에 반드시 사용한 후에, flush()/ close()를 해주어야 한다.</li></ul></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-8054-be1b-d0baa52af014"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8090-a6ac-ecca95e3900c">문자열 더하기</h3></div><div dir="auto" style="display:contents">

```java
String a = "나는 ";
String b = "말하는 ";
String c = "감자";

// String +
String str = a + b + c;
System.out.println(str);	 // 출력 : 나는 말하는 감자

// StringBuffer.append()
StringBuffer sb = new StringBuffer();
sb.append(a).append(b).append(c);
System.out.println(sb); 	// 출력 : 나는 말하는 감자

// StringBuilder.append()
StringBuilder sb2 = new StringBuilder();
sb2.append(a).append(b).append(c);
System.out.println(sb2); 	// 출력 : 나는 말하는 감자

//BufferedWriter
BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
bw.write(a);
bw.write(b);
bw.write(c);
bw.flush();   // 출력 : 나는 말하는 감자
bw.close();
```

</div><div dir="auto" style="display:contents">

```java
//toString()이나 valueOf()을 이용해 둘 다 String값에 대입이 가능하다.
String str1 = sb1.toString();
String str2 = sb2.toString();
```

</div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-80b1-bb22-f296172ef9fb"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8046-9f89-eb531aa4d1d8">반복문 적용</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80ab-a097-eca72e0d9821"><a href="https://www.acmicpc.net/problem/2751">백준 2751번 수 정렬하기 2</a></p></div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-80c8-8f06-f18f8a34e15c"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/java-buffer/image.webp" style="width: 100%; height: auto;"/></figure></div><div dir="auto" style="display:contents">

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;

public class Main {

	public static void main(String[] args) throws NumberFormatException, IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		ArrayList<Integer> list = new ArrayList<Integer>();

		int N =	Integer.parseInt(br.readLine());
		for(int i=0; i<N; i++) {
			list.add(Integer.parseInt(br.readLine()));
		}

		//오름차순 정렬
		Collections.sort(list);

		//StringBuilder 사용
		StringBuilder sb = new StringBuilder();

		//향상된 for문 사용 (list)
		for(int value : list) {
			sb.append(value).append('\\n');
		}

		//StringBuilder 출력
		System.out.println(sb);

	}

}
```

</div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-8003-8ec2-ec305a85a7ea"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/java-buffer/image 1.webp" style="width: 100%; height: auto;"/></figure></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8064-ab4b-dd28069e2245"><li style="list-style-type:disc">아래 3개의 시간초과 모두 StringBuilder를 사용하지 않고 String을 사용해 더해서 생긴 결과다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8007-8d59-d8d42bddf6c8"><li style="list-style-type:disc">위에서 두번째 결과는 위 코드에서 BufferedReader를 쓰지 않고 Scanner을 썼던 결과다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-802d-9602-d9b92083a8ad"><li style="list-style-type:disc">맨 위의 결과가 위의 코드의 결과이다. BufferedReader + StringBuilder을 사용해 빠른 결과를 도출했다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80a9-be42-fa7857e8603a"><li style="list-style-type:disc">Scanner와 BufferedReader 의 비교는 추후에 글로 작성할 예정이다.</li></ul></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-8079-bec0-cbd1c9a724d0"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-807d-bc08-cbe81788258a">특징 비교</h3></div><div dir="ltr" style="display:contents"><table class="simple-table" id="331451cf-7b79-80ed-9e62-f76d5f27eda8"><thead class="simple-table-header"><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-80da-b084-e9a3606304cc"><th class="simple-table-header-color simple-table-header" id="Z`:G"></th><th class="simple-table-header-color simple-table-header" id="i^A&lt;">String</th><th class="simple-table-header-color simple-table-header" id="]t}C">StringBuffer</th><th class="simple-table-header-color simple-table-header" id="vIz_">StringBuilder</th><th class="simple-table-header-color simple-table-header" id="bK;u">BuffereWriter</th></tr></div></thead><tbody><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-8068-a69b-ff3c522239ac"><td class="" id="Z`:G">클래스</td><td class="" id="i^A&lt;">불변</td><td class="" id="]t}C">가변</td><td class="" id="vIz_">가변</td><td class="" id="bK;u">가변</td></tr></div><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-8097-aa7e-e034dfe68469"><td class="" id="Z`:G">문자열 변경</td><td class="" id="i^A&lt;">str += "추가"</td><td class="" id="]t}C">sb.append("추가");</td><td class="" id="vIz_">sb.append("추가");</td><td class="" id="bK;u">bw.write("추가");</td></tr></div><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-80b8-b65e-cb69c16b3f9f"><td class="" id="Z`:G">속도</td><td class="" id="i^A&lt;"><code>매우 매우 매우 느림</code></td><td class="" id="]t}C">빠름</td><td class="" id="vIz_"><code>가장 빠름</code></td><td class="" id="bK;u">보통</td></tr></div><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-8072-a51d-ced76a45f026"><td class="" id="Z`:G">추천 사용 방법</td><td class="" id="i^A&lt;">문자열의 변경이나 추가가 없는경우</td><td class="" id="]t}C">멀티쓰레드 환경</td><td class="" id="vIz_">단일쓰레드 환경</td><td class="" id="bK;u"></td></tr></div></tbody></table></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-8063-87fb-ce88e61c7ef5"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8024-90f6-c18f48a5cabd">상세 속도 비교</h3></div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-80a0-8ec3-da19ac8bf309"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/java-buffer/image 2.webp" style="width:670.3203125px"/></figure></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8072-88c4-e0f448ee39ca">출처 : <a href="http://javapapers.com/">javapapers.com</a></p></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80e1-bb5f-da6c36472113"><li style="list-style-type:disc">y축은 걸리는 시간으로 기울기가 가장 낮은 StringBuilder가 가장 빠르다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-809f-8fbd-dde731bbe34f"><li style="list-style-type:disc">다음은 0을 반복적으로 더해서 직접 걸리는 시간을 구해보는 코드다.</li></ul></div><div dir="auto" style="display:contents">

```java
package Test;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;

public class Time {

	public static void main(String[] args) throws IOException {

		long now;

		// String
		now = System.currentTimeMillis();
		String test = "";
		for (int i = 0; i < 300000; i++) {
			test += "0";
		}
		System.out.println(test);
		System.out.println("String 연산시간 : " + (System.currentTimeMillis()-now));

		// StringBuffer
		now = System.currentTimeMillis();
		StringBuffer buffer = new StringBuffer();
		for (int i = 0; i < 300000; i++) {
			buffer.append("0");
		}
		System.out.println(buffer);
		System.out.println("StringBuilder 연산시간 : " + (System.currentTimeMillis()-now));

		// StringBuilder
		now = System.currentTimeMillis();
		StringBuilder builder = new StringBuilder();
		for (int i = 0; i < 300000; i++) {
			builder.append("0");
		}
		System.out.println(builder);
		System.out.println("StringBuffer 연산시간 : " + (System.currentTimeMillis()-now));

		// BufferedWriter
		now = System.currentTimeMillis();
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		for (int i = 0; i < 300000; i++) {
			bw.write("0");
		}
		bw.newLine();
		bw.flush();
		System.out.println("BufferedWriter 연산시간 : " + (System.currentTimeMillis()-now));

	}

}
```

</div><div dir="auto" style="display:contents">

```plain
//출력 결과
000000000...(300000개)
String 연산시간 : 6267~6500 (너무 느려서 3번만 돌려봄)

000000000...(300000개)
StringBuilder 연산시간 : 25~49 (10회 돌려본 결과)

000000000...(300000개)
StringBuilder 연산시간 : 16~28 (10회 돌려본 결과)

000000000...(300000개)
BufferedWriter 연산시간 : 24~38 (10회 돌려본 결과)
```

</div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-8083-8d44-e4161238e341"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8016-b79a-ed2082833d25">결론</h3></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8081-b239-ecfc28d4f8ba"><li style="list-style-type:disc">String은 문자열을 변경하거나 추가할 때 사용하면 반복이 많아지고 데이터가 커질수록 속도 차이가 많이 나서 쓰지 않는게 좋다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-800b-bf03-f7b104c9eece"><li style="list-style-type:disc">귀찮더라도 문자열을 더하는 경우가 많으면 <code>StringBuilder</code>을 사용하는 습관을 들이자.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-808e-8585-d8df809d5027"><li style="list-style-type:disc">백준에서 문제를 풀었는데 시간초과가 발생한다면 String을 사용했는지부터 보고 고치자.</li></ul></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8078-8195-df29a8f50548">
</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8077-8190-c765cc5ae965">
</p></div></div></article><span class="sans" style="font-size:14px;padding-top:2em"></span>