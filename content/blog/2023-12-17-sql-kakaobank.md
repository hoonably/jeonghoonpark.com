---
title: "SQL로 간소한 카카오뱅크 데이터베이스 만들어보기"
date: 2023-12-17 00:00:00 +09:00
tags: [DB]
category: Study
giscus_comments: true
---


<article class="page sans" id="331451cf-7b79-800c-a98f-ce4e4263ba9e"><header><p class="page-description" dir="auto"></p></header><div class="page-body"><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80c8-b771-f2073047b36d">#주의 - 따라서 만들어보는게 목적이라 섬세하게 만들지 않았습니다.</p></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-801e-b77f-c1ea1c361e16">시작은 ERD ?</h3></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8040-b329-fb513d6fdc1f"><li style="list-style-type:disc"><code><strong>E</strong></code><strong>ntity </strong><code><strong>R</strong></code><strong>elationship </strong><code><strong>D</strong></code><strong>iagram</strong> 의 약자로, 테이블간의 관계를 설명해주는 다이어그램이다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-806e-9d34-e20f85d75083"><li style="list-style-type:disc"><code>관계형 DB</code>(데이터 베이스)에서 주로 사용되며, 데이터베이스를 <strong>시각화</strong>하기 위해 사용한다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8030-aa5a-dc25e5663345"><li style="list-style-type:disc">DB의 구조를 <strong>한눈에 파악</strong>할 수 있다는 장점이 있다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-807a-9986-f856afa8d1fc"><li style="list-style-type:disc">DB 외에도 소프트웨어 기획 단계에서 시스템 요소간의 관계를 식별하는데 사용한다.</li></ul></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80d7-b4d3-fa53e5b7d0b2">하지만 우리는 지금 ERD를 잘짜는게 목적이 아니라</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8042-9b71-c0b2232da1a4">SQL로 DB를 만들어보기 위해 사용한 것이므로 자세하게 보고싶다면 다른 분의 블로그를 참고하자.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80e2-8a59-cc153ebb132b"><a href="https://velog.io/@kjhxxxx/DataBase-ERD%EB%9E%80">ERD란? kjhxxxx님의 블로그</a></p></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-80cb-a6ed-c8136a2ef10a"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-808e-a7bd-f3bd835b0e8a">ERD Cloud를 통해 ERD 만들기</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-807f-b5c9-eefd557b5086">아까 말했다시피 우리의 목적은 <strong>SQL</strong>을 이용한 <strong>DB만들기</strong> 이므로 ERD 속 관계는 대충 만들어보았다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8074-b45b-f725b012b48b">자료형, Default, NOT NULL 등은 깊게 생각하지 않고 일단 만들었다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80bd-8186-f3502fa6b826">SQL 공부인데 ERD의 기호들까지 하나하나 따지기엔...</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8032-9d55-c61aa61a4cc3">아래 다이어그램을 만든 사이트 링크다.  <a href="https://www.erdcloud.com/d/hPcHuBcKM6CLXNhqn">Hoon's Kakao bank ERDCloud</a></p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80b4-bdd8-dfd8f7982ae7">이 사이트에서 SQL파일을 한번에 <code>Export</code>할 수 있지만, 대충 만들었기 때문에 Error가 오백개 이상 발생할 수 도 있어서,</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80d7-b127-e308549acafe">하나하나 SQL 로 만들어보는게 차라리 맘 편할 수 있다.</p></div><iframe width="100%" height="600" src="https://www.erdcloud.com/p/hPcHuBcKM6CLXNhqn" frameborder="0" allowfullscreen></iframe><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8015-8362-e0bbbd3f0f6c">축소를 최대로 줄여보면 어마어마해보이지만... 실제 카카오뱅크에서는 이거의 10배도 넘을것 같다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8040-a54b-cda413dce0ed">실제 회사에서는 ERD만 3주 넘게도 만든다고 한다.</p></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-80fe-87eb-e9c3eb4fa182"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-801e-b9d6-d75632130c4c">SQL 하기 전 알아두면 좋은 것</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80d1-919d-de3a0bcd3cca">SQL은 파이썬과 같은 언어와 다르게 하나의 명령을 실행할 수 있다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8054-a879-d120858ebe94">나는 <code>MariaDB</code> + <code>DBeaver</code> 프로그램을 사용했다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8072-b45d-fdb8d4f4253b">마우스를 그 명령 어딘가에 클릭 한 후 <code>Ctrl</code> + <code>Enter</code>를 누르면 그 명령이 실행된다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80fb-9fb9-ee708364b6f0">그리고 가장 중요한건... 바로바로 창마다 <strong>연동이 안되기 때문</strong>에 클릭 후 데이터창에  <code>F5</code> 새로고침을 눌러줘야한다...</p></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-80fa-8b04-e853fca21e60"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80a8-a771-c1d21594ffad">SQL 데이터베이스 생성 및 사용</h3></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80ca-9335-d6e9a916e966">데이터베이스 생성</h3></div><div dir="auto" style="display:contents">

```sql
create database erd_kakaobank;
```

</div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80eb-a394-ea400a366f9b">생성 확인</h3></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8088-b663-d22db086e01f"><li style="list-style-type:disc">localhost에 저장된 데이터베이스들이 나온다. (이전에 만든것도 나온다.)</li></ul></div><div dir="auto" style="display:contents">

```sql
show databases;
```

</div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8096-9717-f20db644485e">데이터베이스 사용</h3></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80e6-a9ba-f66090d83215"><li style="list-style-type:disc">어떤 데이터베이스를 사용할건지 선택해준다.</li></ul></div><div dir="auto" style="display:contents">

```sql
use erd_kakaobank;
```

</div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-8006-8a7d-e11a37670216"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80d4-9e2b-ea3dd11c4dcc">테이블들 생성</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80dd-a89f-ce5bf193233a">ERD 만든 것을 토대로 모든 테이블을 넣기엔 너무 오랜 시간이 걸릴 것 같아 <strong>3개의 테이블만</strong> 진행했다!!</p></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80ea-9974-c780448295ca">유저 테이블 생성</h3></div><div dir="auto" style="display:contents">

```sql
create table k_user (
	user_idx int primary key auto_increment not null comment '유저 PK 값',
	user_id varchar(30) default '' not null comment '유저 ID',
	user_pass varchar(50) default '' not null comment '유저 PW',
	user_real_name varchar(50) default '' not null comment '유저 실명',
	user_nick varchar(50) default '' comment '유저 닉네임',
	user_age int default 0 comment '유저 나이',
	user_phone varchar(255) default '' comment '유저 핸드폰번호',
	user_mail varchar(255) default '' comment '유저 이메일',
	user_gender int comment '0.알수없음 / 1.남자 / 2.여자 / 3.특수성별',
	user_ip varchar(150) default '' comment '유저가 접속한 ip 주소',
	user_status int default 0 comment '0: 차단 / 1: 정상 / 2: 탈퇴 / 3. 휴먼',
	user_reg_dt datetime default now() comment '생성 날짜',
	user_update_dt datetime default now() comment '변동 날짜'
);
```

</div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80d1-9f71-f47c815aead2">유저 신용점수 테이블 생성</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8042-910d-fd20e1394477">한사람당 하나의 신용점수이므로 <code>unique</code>를 걸어둔다.</p></div><div dir="auto" style="display:contents">

```sql
create table user_cs (
	user_idx int unique default 0 not null comment '유저 PK 값',
	user_KCB_cs int default 0 comment '',
	user_NICE_cs int default 0 comment ''
);
```

</div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8048-9ea8-d5ff2ae84213">유저 입출금 통장 테이블 생성</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8023-9762-f221197c07ed">계좌는 같은 사람이 여러개 쓸 수 있기 때문에 <code>user_idx</code>에 <code>unique</code>를 걸지 않는다.</p></div><div dir="auto" style="display:contents">

```sql
create table k_bank (
	bank_account_num varchar(30) primary key default '' not null comment '유저 계좌번호',
	user_idx int default 0 not null comment '유저 PK 값',
	bank_status int default 0 not null comment '계좌 상태 0: 정상 / 1: 일시정지 / 2. 영구정지',
	bank_once_send bigint default 0 not null comment '1회송금한도',
	bank_day_send bigint default 0 not null comment '하루송금한도',
	bank_today_send bigint default 0 comment '오늘 송금 총 금액',
	bank_money bigint default 0 not null comment '현재 금액',
	bank_or_allow int default 0 not null comment '해외 송금 0: 허용 1: 미허용',
	bank_pass varchar(4) default 0000 not null comment '계좌 비밀번호',
	bank_pass_not int default 0 not null comment '5회시 계좌 일시 정지',
	bank_reg_dt datetime default now() comment '생성 날짜',
	bank_update_dt datetime default now() comment '변동 날짜'
);
```

</div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-8090-97a0-d1fa83467a39"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8063-9b89-cdb51e9b2c1c">DCL, DDL, DML 이란?</h3></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-801d-a5db-db6874405e45"><li style="list-style-type:disc"><code><strong>DCL</strong></code> : 데이터베이스에 대한 접근 권한 등 사용자의 권한을 조작하는 언어</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-803e-abce-f08828b140d3"><li style="list-style-type:disc"><code><strong>DDL</strong></code> : 데이터베이스, 테이블 조작 언어</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8072-9893-dc839b369b74"><li style="list-style-type:disc"><code><strong>DML</strong></code> : 데이터 조작 언어<div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80cd-b4b4-ff154ee1ea69"><strong>C</strong> : create / insert</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80dd-b5b3-e2c2d943dc03"><strong>R</strong> : read / select</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-801a-9bfb-d7597beb8c2a"><strong>U</strong> : update / update</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80df-ab87-d37c0b8294f6"><strong>D</strong> : delete / delete</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8049-bb34-f98c706c047a">지금까지 테이블을 조작하는 <code>DDL</code>을 했다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8039-9b2a-edd04966f8e2">이제 가장 중요한 <code>DML</code>의 <code>CRUD</code>를 할 차례다!</p></div></li></ul></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-801c-8440-da6c36a88f66"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80f2-b2f6-ffde5e2b714c">insert / 데이터 넣기</h3></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80ba-921a-f989da73003e">컬럼 정보 열기</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80cf-885f-dedf3e8e3022">	 이걸 해놓고 insert문을 만들면 편하다.</p></div><div dir="auto" style="display:contents">

```sql
show columns from k_user;
```

</div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8029-a97b-c45ffa86f85d">k_user (유저 정보) insert</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80e2-982c-e37851b4f4ca">	유저들의 정보를 k_user 컬럼에 넣어준다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-803e-981c-c2b631465454">	내 지인들 중 동명이인들이 있던거 같은데 전혀 생각하지 않고 만들었다. 우연일 뿐.</p></div><div dir="auto" style="display:contents">

```sql
insert into k_user (
	user_id,
	user_pass,
	user_real_name,
	user_nick,
	user_age,
	user_phone,
	user_mail,
	user_gender,
	user_ip,
	user_status
) values
	('hoonpx', 'a12345', '박정훈', '컴공쓰러진다', 23, '01045454545','test1@naver.com', 1, '127.0.0.1', 1),
	('mechanical', 'a12345', '김민종', '10조귀요미', 23, '01045234545','test2@naver.com', 1, '127.0.0.1', 1),
	('hotboy', 'a12345', '강홍준', '티라노조아', 23, '01045453455','test3@naver.com', 1, '127.0.0.1', 1),
	('jordan123', 'a12345', '임준호', '다음조던은뭐살까', 23, '01044574545','test4@naver.com', 1, '127.0.0.1', 2),
	('unipianist', 'a12345', '황가현', '피아니스트', 23, '01045345545','test5@naver.com', 2, '127.0.0.1', 1),
	('daehakwon1', 'a12345', '유희진', '뮤지컬볼사람', 24, '01045467945','test6@naver.com', 2, '127.0.0.1', 1),
	('goodbyeuni', 'a12345', '최유선', '유도니', 23, '01012654545','test7@naver.com', 2, '127.0.0.1', 1),
	('thief', 'a12345', '장인준', '도둑놈', 23, '01045412685','test8@naver.com', 1, '127.0.0.1', 3),
	('military123', 'a12345', '조승민', '나만군대감?', 23, '01045424245','test9@naver.com', 3, '127.0.0.1', 1),
	('billionaire', 'a12345', '노승환', 'A+왜못맞음?', 23, '01090554545','test10@naver.com', 1, '127.0.0.1', 1),
	('unist5th', 'a12345', '정성윤', '유니석박사', 23, '01044634545','test11@naver.com', 1, '127.0.0.1', 3),
	('pianist123', 'a12345', '김혜나', '김개나', 21, '01043454545','test12@naver.com', 2, '127.0.0.1', 1),
	('surisuri', 'a12345', '김수린', '나이거꾸로입력함', 72, '01045496945','test13@naver.com', 2, '127.0.0.1', 3),
	('ridebike12', 'a12345', '김수용', '아저씨아님', 40, '01044634545','test11@naver.com', 1, '127.0.0.1', 3);
```

</div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-807f-b9e7-d64e833d098e">이렇게 정상적으로 들어갔는지 확인할 수 있다. (옆에 user_update_dt도 있는데 너무 길어서 잘랐다.</p></div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-80c4-b306-c8956bdb3798"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/sql-kakaobank/image.webp" style="width: 100%; height: auto;"/></figure></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80dc-98c7-eac90cad9470">user_cs (유저 신용점수) insert</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-800f-b3eb-c88a08f35bb7">	유저들의 신용점수를 user_cs 컬럼에 넣어준다.</p></div><div dir="auto" style="display:contents">

```sql
show columns from user_cs;

insert into user_cs  (
	user_idx,
	user_KCB_cs,
	user_NICE_cs
) values
	(1,999,999),
	(2,400,500),
	(3,200,300),
	(4,600,300),
	(5,700,750),
	(6,900,950),
	(7,650,700),
	(8,700,750),
	(9,700,750),
	(10,999,999),
	(11,100,200),
	(12,600,300),
	(13,960,990),
	(14,100,200);
```

</div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-80af-9777-ed9cfe9470d6"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/sql-kakaobank/image 1.webp" style="width:670.3125px"/></figure></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-805a-a7dd-c336eb72d528">k_bank (카카오뱅크 계좌) insert</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80fa-9060-e91e605215c0">	카카오뱅크 계좌들의 정보를 k_bank에 넣어준다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80f8-8012-d754b251fc85">	이때 한사람(하나의 user_idx)이 여러개의 계좌를 가지고 있을 수 있다.</p></div><div dir="auto" style="display:contents">

```sql
show columns from k_bank;

insert into k_bank (
	bank_account_num,
	user_idx,
	bank_status,
	bank_once_send,
	bank_day_send,
	bank_money,
	bank_or_allow,
	bank_pass,
	bank_pass_not
) values
	('3333-10-171-6701', 1, 0, 2000000, 10000000, 2000, 1, '0000', 0),
	('3333-10-171-2341', 1, 0, 2000000, 10000000, 11000000, 1, '0000', 0),
	('3333-10-171-1236', 2, 0, 2000000, 10000000, 21000000, 1, '0000', 0),
	('3333-10-234-4563', 3, 0, 2000000, 10000000, 15000000, 1, '0000', 1),
	('3333-10-253-6701', 4, 0, 2000000, 10000000, 17000000, 0, '0000', 1),
	('3333-23-171-4552', 5, 0, 2000000, 10000000, 145000000, 1, '0000', 3),
	('3333-23-171-4474', 6, 0, 2000000, 10000000, 212000, 1, '0000', 0),
	('3333-10-234-4535', 6, 0, 2000000, 10000000, 132112000, 1, '0000', 1),
	('3333-56-171-1243', 7, 0, 2000000, 10000000, 2000, 1, '0000', 0),
	('3333-10-346-6701', 8, 0, 2000000, 10000000, 50, 1, '0000', 1),
	('3333-10-285-3452', 9, 0, 2000000, 10000000, 1231200, 1, '0000', 0),
	('3333-10-171-2344', 10, 0, 100000000, 5000000000, 1000000000000, 0, '0000', 0),
	('3333-10-235-2341', 11, 0, 5000, 50000, 500, 0, '0000', 0),
	('3333-10-768-6701', 12, 0, 2000000, 10000000, 7050000, 1, '0000', 1),
	('3333-10-253-4567', 12, 0, 2000000, 10000000, 120000, 1, '0000', 0),
	('3333-23-900-2345', 13, 0, 2000000, 10000000, 2006750, 1, '0000', 2),
	('3333-10-876-6785', 13, 0, 50000000, 2000000000, 2200000000, 1, '0000', 3),
	('3333-40-456-4565', 14, 0, 2000000, 10000000, 1230, 1, '0000', 0);
```

</div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-801c-a340-fc561c536179"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/sql-kakaobank/image 2.webp" style="width: 100%; height: auto;"/></figure></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-8015-8bfa-d5b29288ce8e"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-800d-b0f4-d4b56041a9a2">Select 문으로 정보 검색</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-801f-baf2-c17ce2b7d092">이제 <strong>CRUD</strong> 중에 **Create(insert)**를 끝냈으니, **Read(select)**를 해볼 차례다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80d1-a5fc-f4791893ff94"><strong>Select</strong>문이 아마 <strong>DB</strong>의 **90%**를 차지한다고 해도 과언이 아니다.</p></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8098-a50a-d5147e9b5b78">20대가 아닌 사람 검색</h3></div><div dir="auto" style="display:contents">

```sql
select
	user_idx ,
	user_real_name ,
	user_nick ,
	user_age
from
	k_user ku
where
	user_age < 20 or user_age >= 30;
```

</div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-808d-9511-d220b6359f1c"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/sql-kakaobank/image 3.webp" style="width:670.328125px"/></figure></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8041-9715-fce56149f4b6"><strong>김수린</strong>씨와 김수용씨가 20대가 아닌것으로 파악되었다.</p></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80f3-ba56-c458f2593dd2">회원 성별별 인원수 검색</h3></div><div dir="auto" style="display:contents">

```sql
select
	user_gender as '1: 남자 / 2: 여자 / 3: 특수성별',
	count (user_gender) as count
from
	k_user ku
group by
	user_gender;
```

</div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-8038-ba6c-e8ab348a9182"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/sql-kakaobank/image 4.webp" style="width:670.3203125px"/></figure></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8015-bbeb-d0b8162983a3"><strong>남자 8명</strong>, <strong>여자 5명</strong>, <strong>특수성별</strong>(조XX씨) <strong>1명</strong>이 나왔다.</p></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-800f-852d-eb5493597a01">유저 이름, 나이, 신용등급, 계좌번호, 카카오뱅크 잔액을 검색</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80e3-84b9-f03bb29c459c">	(유저 idx로 정렬 후 같은 idx중에서는 잔액 내림차순으로 정렬)</p></div><div dir="auto" style="display:contents">

```sql
select
	ku.user_real_name '이름',
	ku.user_age '나이',
	uc.user_KCB_cs 'KCB 신용점수',
	uc.user_NICE_cs 'NICE 신용점수',
	kb.bank_account_num '계좌번호',
	kb.bank_money '통장 잔액'
from
	k_user ku
inner join
	user_cs uc
	on ku.user_idx = uc.user_idx
inner join
	k_bank kb
	on ku.user_idx = kb.user_idx
order by
	ku.user_idx, kb.bank_money desc;
```

</div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-802d-942b-e5282c8abae4"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/sql-kakaobank/image 5.webp" style="width:670.3203125px"/></figure></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-8095-8d5c-f2ab731523a5"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80f0-a6c3-de4864404fa1">Update 문으로 정보 업데이트</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80bb-b28b-e3655d7db466">이제 <strong>CRUD</strong> 중에 **Read(select)**를 끝냈으니, <strong>Update</strong>를 해볼 차례다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-809e-b90e-e9bdadc6df55"><strong>Update</strong>와 <strong>Delete</strong>는 항상 조심해야한다. <code>in</code>을 사용해 제한을 걸어줘야 큰 실수를 방지할 수 있다.</p></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80b8-836e-d98b9afa8a14">모든 휴면계정을 정상 상태로 업데이트 하기</h3></div><div dir="auto" style="display:contents"><ol class="numbered-list" id="331451cf-7b79-8050-a6b6-c010976bce36" start="1" type="1"><li>휴면계정을 검색해준다.<div dir="auto" style="display:contents">

```sql
select user_idx , user_real_name  from k_user ku where user_status =3;
```

</div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-8087-839f-c5092cb16b78"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/sql-kakaobank/image 6.webp" style="width:632.3046875px"/></figure></div></li></ol></div><div dir="auto" style="display:contents"><ol class="numbered-list" id="331451cf-7b79-80a0-9ef2-ddda3a64a34d" start="2" type="1"><li>위 검색에서 나온 idx만 수정되도록 제한을 해주고 업데이트 해준다. (실수 방지)<div dir="auto" style="display:contents">

```sql
update k_user set user_status = 1 where user_idx in (8, 11, 13, 14) and user_status =3;
```

</div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-80d1-8930-d73e930124c5"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/sql-kakaobank/image 7.webp" style="width:632.3203125px"/></figure></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80b6-9db6-e72d8860a7ad">Updated Rows : 4 이므로 4개의 정보가 업데이트 된 것이다.</p></div></li></ol></div><div dir="auto" style="display:contents"><ol class="numbered-list" id="331451cf-7b79-80db-a9c1-c912267d9199" start="3" type="1"><li>업데이트가 잘 되었는지 확인한다.<div dir="auto" style="display:contents">

```sql
select
	user_idx ,user_real_name ,user_status
from
	k_user ku
where
	user_idx in (8, 11, 13, 14);
```

</div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-8040-9273-d4549aaf5384"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/sql-kakaobank/image 8.webp" style="width:632.3203125px"/></figure></div></li></ol></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-80b7-a7dc-d559fff40a25"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80aa-8282-da3db67bfea6">Delete 문</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8087-968b-e8ada9bc414a">Delete는 실제로 거의 <strong>사용하지 않는다</strong>... Delete 작업은 너무 <strong>위험</strong>하다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8053-97be-c43e5328886b">차라리 탈퇴계정에 대한 표시를 하는 컬럼을 만들어 표시해놓는 경우가 대부분이다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80e5-829c-fe1dc73ef693">ex) 0: 정상 1: 탈퇴</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80c5-ba07-f495b9361f9f">Update를 이용해 이용상태 컬럼을 바꿔주자.</p></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-806e-bcc0-dfc9a9afdd68"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8099-a987-eb5e58a3f34c">마무리</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8078-b0ae-cee08c3cc877">DB 관리자가 될것도 아니고 취직을 바로 할것도 아니지만, 이것저것  <strong>찍먹</strong>해보고자 sql언어를 통한 DB를 공부해봤다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8081-8cc1-f0fa0a7ede8a">공부한 것을 바탕으로 총정리를 이 글을 통해서 해봤다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-804b-bc23-cc7aeb8402d5">정말 찍먹 수준이지만 꼭 python, java, c++과 같은 언어와는 완전 다른 느낌의 언어를 다뤄보니 재미있었다.</p></div></div></article><span class="sans" style="font-size:14px;padding-top:2em"></span>