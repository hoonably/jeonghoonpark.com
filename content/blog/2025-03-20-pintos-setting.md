---
title: "[OS] Mac Pintos Setting"
date: 2025-03-20 00:00:00 +09:00
tags: [CS]
category: Tip
giscus_comments: true
---


<article class="page sans" id="331451cf-7b79-80b9-80e3-c23f54c8bccc"><header><p class="page-description" dir="auto"></p></header><div class="page-body"><div dir="auto" style="display:contents"><blockquote class="" id="331451cf-7b79-8098-8916-e76c90531387">Welcome to Pintos. Pintos is a simple operating system framework for the 80x86 architecture.</blockquote></div><div dir="auto" style="display:contents"><h1 class="" id="331451cf-7b79-8082-92f0-e7c18b34be67">Docker Build</h1></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-807b-844f-c03dcd94e962"><a href="https://github.com/NamJeongseok/PintOS-Docker-UNIST">https://github.com/NamJeongseok/PintOS-Docker-UNIST</a></p></div><div dir="auto" style="display:contents">

```bash
FROM ubuntu:12.04

RUN sed -i -e 's/archive.ubuntu.com/old-releases.ubuntu.com/g' /etc/apt/sources.list
RUN sed -i -e 's/security.ubuntu.com/old-releases.ubuntu.com/g' /etc/apt/sources.list

RUN apt-get update && apt-get install -y \\
	bash \\
	vim \\
	build-essential \\
	gcc-4.4 \\
	gcc-multilib \\
	g++-4.4 \\
	perl \\
	wget \\
	patch \\
	libncurses5-dev \\
	libx11-dev libxrandr-dev xorg-dev \\
	make

RUN mv /usr/bin/gcc-4.4 /usr/bin/gcc
RUN mv /usr/bin/g++-4.4 /usr/bin/g++
COPY ./bochs-2.2.6.tar.gz /root/
RUN mkdir /root/pintos
RUN echo 'export PATH="$PATH:/root/pintos/src/utils"' >> ~/.bashrc

CMD ["/bin/bash"]
```

</div><div dir="auto" style="display:contents">

```bash
git clone git@github.com:NamJeongseok/PintOS-Docker-UNIST.git
cd PintOS-Docker-UNIST
```

</div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8056-8aee-f73a3071ee9a"><li style="list-style-type:disc">amd64 (x86_64) (Window)</li></ul></div><div dir="auto" style="display:contents">

```bash
sudo docker build -t pintos .
```

</div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80cc-8b52-f3f76c1d54d1"><li style="list-style-type:disc">ARM64 (Silicon Mac)</li></ul></div><div dir="auto" style="display:contents">

```bash
docker build --platform=linux/amd64 -t pintos .
```

</div><div dir="auto" style="display:contents"><h1 class="" id="331451cf-7b79-807e-9c19-d93b60db52f9">Error</h1></div><div dir="auto" style="display:contents">

```bash
➜  PintOS-Docker-UNIST git:(main) sudo docker build -t pintos .
Password:
[+] Building 1.8s (9/14)                                                          docker:desktop-linux
 => [internal] load build definition from Dockerfile                                              0.0s
 => => transferring dockerfile: 696B                                                              0.0s
 => [internal] load metadata for docker.io/library/ubuntu:12.04                                   1.5s
 => [auth] library/ubuntu:pull token for registry-1.docker.io                                     0.0s
 => [internal] load .dockerignore                                                                 0.0s
 => => transferring context: 2B                                                                   0.0s
 => [1/9] FROM docker.io/library/ubuntu:12.04@sha256:18305429afa14ea462f810146ba44d4363ae76e4c8d  0.0s
 => => resolve docker.io/library/ubuntu:12.04@sha256:18305429afa14ea462f810146ba44d4363ae76e4c8d  0.0s
 => [internal] load build context                                                                 0.0s
 => => transferring context: 42B                                                                  0.0s
 => CACHED [2/9] RUN sed -i -e 's/archive.ubuntu.com/old-releases.ubuntu.com/g' /etc/apt/sources  0.0s
 => CACHED [3/9] RUN sed -i -e 's/security.ubuntu.com/old-releases.ubuntu.com/g' /etc/apt/source  0.0s
 => ERROR [4/9] RUN apt-get update && apt-get install -y  bash  vim  build-essential  gcc-4.4  g  0.2s
------
 > [4/9] RUN apt-get update && apt-get install -y 	bash 	vim 	build-essential 	gcc-4.4 	gcc-multilib 	g++-4.4 	perl 	wget 	patch 	libncurses5-dev 	libx11-dev libxrandr-dev xorg-dev 	make:
0.202 qemu: uncaught target signal 11 (Segmentation fault) - core dumped
0.206 E: Method http has died unexpectedly!
0.207 E: Sub-process http received a segmentation fault.
------

 1 warning found (use docker --debug to expand):
 - InvalidBaseImagePlatform: Base image ubuntu:12.04 was pulled with platform "linux/amd64", expected "linux/arm64" for current build (line 1)
Dockerfile:6
--------------------
   5 |
   6 | >>> RUN apt-get update && apt-get install -y \\
   7 | >>> 	bash \\
   8 | >>> 	vim \\
   9 | >>> 	build-essential \\
  10 | >>> 	gcc-4.4 \\
  11 | >>> 	gcc-multilib \\
  12 | >>> 	g++-4.4 \\
  13 | >>> 	perl \\
  14 | >>> 	wget \\
  15 | >>> 	patch \\
  16 | >>> 	libncurses5-dev \\
  17 | >>> 	libx11-dev libxrandr-dev xorg-dev \\
  18 | >>> 	make
  19 |
--------------------
ERROR: failed to solve: process "/bin/sh -c apt-get update && apt-get install -y \\tbash \\tvim \\tbuild-essential \\tgcc-4.4 \\tgcc-multilib \\tg++-4.4 \\tperl \\twget \\tpatch \\tlibncurses5-dev \\tlibx11-dev libxrandr-dev xorg-dev \\tmake" did not complete successfully: exit code: 100

View build details: docker-desktop://dashboard/build/desktop-linux/desktop-linux/307xpyqphklv4cd5fc8tmb1eg
```

</div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80d6-afae-c8b41d1b094e">Rosetta 키기</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-800a-989a-f3ef4ebde026">내가 전에 핀토스 미리 해보려고 블로그 찾아보다가 이 설정을 꺼야 x86으로 확실하게 돌아간다고 해서 꺼놨었는데, 이거 키니까 잘 된다.</p></div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-8033-bb41-dfa5df3a5998"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/pintos-setting/image.webp" style="width: 100%; height: auto;"/></figure></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8002-8f84-e7ddd6069ae2">이전에 핀토스 미리 해보려고 할때, 어떤 블로그 보고</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80e8-a187-f219d05c878c">저걸 꺼야 x86으로 정확히 작동한다고 해서 꺼놨었는데, 이게 문제였다.</p></div><div dir="auto" style="display:contents"><blockquote class="" id="331451cf-7b79-801e-8f14-fa4e178a0fdc">Docker에서는 <code>--platform=linux/amd64</code> 옵션으로 x86 이미지를 실행할 때, 내부적으로 QEMU를 이용해 에뮬레이션함.<div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80f0-87c7-c9e81db2a0bf">이때 Rosetta를 활성화하면 QEMU가 더 안정적이고 빠르게 동작함. 특히 오래된 리눅스 이미지(Ubuntu 12.04 같은 거)에서 apt-get이 죽거나 세그폴트 나는 경우, 대부분 Rosetta 꺼져 있어서 생기는 문제임.</p></div></blockquote></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8052-8e4d-faf7f5cc2949">빌드 성공</h3></div><div dir="auto" style="display:contents">

```bash
docker build --platform=linux/amd64 -t pintos .
```

</div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-805c-8349-eb166377ec7d"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/pintos-setting/image 1.webp" style="width:670.3203125px"/></figure></div><div dir="auto" style="display:contents"><h1 class="" id="331451cf-7b79-80fd-9280-deb11e19e198">Start</h1></div><div dir="auto" style="display:contents">

```bash
wget [<http://www.stanford.edu/class/cs140/projects/pintos/pintos.tar.gz>](<http://www.stanford.edu/class/cs140/projects/pintos/pintos.tar.gz>)
```

</div><div dir="auto" style="display:contents">

```bash
tar xvf pintos.tar.
```

</div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8082-b15f-d5db021d3d54">파일 권한 에러 해결</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80c3-b5a5-f4541454eb50">진짜 이거때문에 개고생했음…</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8051-9f48-fd8a4282ceb1">Stanford에서 받은 파일이 권한이 없는 채로 주는데,</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-800b-b49a-f667aed5417b">윈도우에서는 원래 상관이 없어서 괜찮은데,</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80ae-891e-f569088150f8">맥에서는 실행 불가능한채로 압축이 풀어져서 문제가 발생함.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-804f-bc18-e5acac9af95f">근데 이게 또 이 상태로 Docker로 옮겨서 그냥 Permission Denied 해버리니까</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80d4-947c-c2d0ba6661a4">이게 도대체 왜 그런지 GPT 써도 잘 몰랐음.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80b3-9778-cddac6d55c2b">Docker 넘어가기 전부터 원본 파일 권한이 부족해서 그런건데 Docker 파일 공유 방식때문인줄알고 삽질함</p></div><div dir="auto" style="display:contents">

```bash
xattr -rc pintos/
```

</div><div dir="auto" style="display:contents">

```bash
chmod -R u+rwX,go+rX pintos/
```

</div><div dir="auto" style="display:contents">

```bash
find pintos/ -type f -exec ls -l {} \\;
```

</div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80eb-b576-e231c9818279">위 명령어 하면 아래처럼 file permission이 뜸</p></div><div dir="auto" style="display:contents">

```bash
-rw-r--r--@ 1 hoon  staff  333  9 27  2012 pintos//src/Makefile.kernel
-rwxr-xr-x@ 1 hoon  staff  1486  9 27  2012 pintos//src/misc/bochs-2.2.6-build.sh
-rw-r--r--@ 1 hoon  staff  511  9 27  2012 pintos//src/misc/bochs-2.2.6-solaris-link.patch
```

</div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80ab-bc5e-c211ce98f86f">여기 보면 실행 가능한 파일 (.sh) 파일 등에 x 표시가 생길것임.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80c1-8995-e7d86988d339">또는 실행 가능한 파일만 권한 보려면</p></div><div dir="auto" style="display:contents">

```bash
find pintos/ -type f -perm -111 -exec ls -l {} \\;
```

</div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-806d-af93-fa6d39183886">아래처럼 됐다면 성공</p></div><div dir="auto" style="display:contents">

```bash
-rwxr-xr-x@ 1 hoon  staff  1486  9 27  2012 pintos//src/misc/bochs-2.2.6-build.sh
-rwxr-xr-x@ 1 hoon  staff  4096  9 27  2012 pintos//src/tests/make-grade
-rwxr-xr-x@ 1 hoon  staff  2951  9 27  2012 pintos//src/utils/backtrace
-rwxr-xr-x@ 1 hoon  staff  4563  9 27  2012 pintos//src/utils/pintos-mkdisk
-rwxr-xr-x@ 1 hoon  staff  429  9 27  2012 pintos//src/utils/pintos-gdb
-rwxr-xr-x@ 1 hoon  staff  29821  9 27  2012 pintos//src/utils/pintos
```

</div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-800a-9248-db61cf015f0f">컨테이너 들어가기 전에 로컬에서 편하게 <code>bochs</code> 파일 수정</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80de-b891-d236a0cb73b3"><code>pintos/src/misc/bochs-2.2.6-build.sh</code></p></div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-80f5-8406-f32c224da40f"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/pintos-setting/image 2.webp" style="width: 100%; height: auto;"/></figure></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8010-af07-d27117249b15"><li style="list-style-type:disc">다음 내용으로 수정</li></ul></div><div dir="auto" style="display:contents">

```bash
CFGOPTS="--enable-cpu-level=6 --with-x --with-x11 --with-term --with-nogui --prefix=$DSTDIR"
```

</div><div dir="auto" style="display:contents"><h1 class="" id="331451cf-7b79-8023-8070-dc9797a8795a">docker run</h1></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8092-90d8-e8f1e5c441f4">드디어 제대로 실행해보자.</p></div><div dir="auto" style="display:contents">

```bash
docker run --platform=linux/amd64 -it -p 80:80 \\
	-v /Users/hoon/github/pintos/pintos:/root/pintos \\
	--name pintos pintos
```

</div><div dir="auto" style="display:contents"><h1 class="" id="331451cf-7b79-8010-b600-d9b297a4cfed">boch 2.6.6 설치</h1></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80dd-96c8-f700dadef85b"><li style="list-style-type:disc">위에서 VSCode로 bochs 수정 안했다면<div dir="auto" style="display:contents">

```bash
cd pintos/src/misc
```

</div><div dir="auto" style="display:contents">

```bash
vi bochs-2.2.6-build.sh
```

</div><div dir="auto" style="display:contents"><blockquote class="" id="331451cf-7b79-8075-9a41-d8b4b2b3ed60">i : 수정 모드<br/>수정...<br/>ESC : 수정 모드 나가기<br/>:wq : 저장 후 종료</blockquote></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80f0-be79-e3fda0beaaac"><li style="list-style-type:circle">다음 내용으로 수정</li></ul></div><div dir="auto" style="display:contents">

```bash
CFGOPTS="--enable-cpu-level=6 --with-x --with-x11 --with-term --with-nogui --prefix=$DSTDIR"
```

</div></li></ul></div><div dir="auto" style="display:contents"><blockquote class="" id="331451cf-7b79-8055-a958-e079763937eb">📢 만약 Container를 삭제해서 다시 Run한다면 이 과정을 다시 해줘야한다.</blockquote></div><div dir="auto" style="display:contents">

```bash
cd /root/pintos/src/misc
```

</div><div dir="auto" style="display:contents">

```bash
env SRCDIR=/root/ PINTOSDIR=/root/pintos/ DSTDIR=/usr/local ./bochs-2.2.6-build.sh
```

</div><div dir="auto" style="display:contents">

```bash
which bochs
bochs -v
```

</div><div dir="auto" style="display:contents"><h1 class="" id="331451cf-7b79-8071-b3ab-f0b924e6d227">Test</h1></div><div dir="auto" style="display:contents">

```bash
cd /root/pintos/src/threads
```

</div><div dir="auto" style="display:contents">

```bash
make
```

</div><div dir="auto" style="display:contents">

```bash
cd build
```

</div><div dir="auto" style="display:contents">

```bash
pintos -q run alarm-multiple
```

</div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-80c0-85ff-e0dc0a736625"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/pintos-setting/image 3.webp" style="width: 100%; height: auto;"/></figure></div><div dir="auto" style="display:contents"><h1 class="" id="331451cf-7b79-806c-a723-cda72e1ecfe2">github repo 생성</h1></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8031-8d68-e9243697011e"><a href="https://github.com/hoonably/pintos">https://github.com/hoonably/pintos</a></p></div><div dir="auto" style="display:contents"><h1 class="" id="331451cf-7b79-8047-9066-e790a40423da">root/pintos/src 에서 시작하기</h1></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80c3-b9b0-d151ae117370">할때마다 root 폴더에서 시작하는방법</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8071-9930-da9e5a1642cf">한번 쳐주면 항상 적용됨.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-805a-988e-d489feac2bd2">도커파일에 다음 줄을 넣어도 되긴 함.</p></div><div dir="auto" style="display:contents">

```docker
WORKDIR /root/pintos/src
```

</div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8043-8bb8-cf0ece456da4">근데 이미 빌드했으니 아래 명령어를 컨테이너 내부에서 치면 됨</p></div><div dir="auto" style="display:contents">

```bash
echo 'cd /root/pintos/src' >> ~/.bashrc
```

</div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80cb-a735-f26db27d3850"><li style="list-style-type:disc">이후 bashrc 상황<div dir="auto" style="display:contents">

```bash
cat ~/.bashrc
```

</div><div dir="auto" style="display:contents">

```bash
... 맨 아래줄에 다음 두줄이 있으면 성공
export PATH="$PATH:/root/pintos/src/utils"
cd /root/pintos/src
```

</div></li></ul></div><div dir="auto" style="display:contents"><h1 class="" id="331451cf-7b79-8066-a240-d114cdbd37a7">한번 Run 이후 Container 시작</h1></div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-8011-906e-d60de2ab086a"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/pintos-setting/image 4.webp" style="width:670.3203125px"/></figure></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8046-9aad-e330be880aff">컨테이너에서 <code>exit</code> 를 했다면,</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8037-b6d2-febcaf223bde">위처럼 Container는 남아있고, 중지되어있을 것이다.</p></div><div dir="auto" style="display:contents">

```bash
docker start -ai pintos
```

</div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80b6-8569-c00c050d9fa8">나중에 또 같은 방식으로 <code>exit</code> 하고 반복하면 된다.</p></div><div dir="auto" style="display:contents"><h1 class="" id="331451cf-7b79-80df-a701-ce0ceb3d11f8">Branch</h1></div><div dir="auto" style="display:contents"><h2 class="" id="331451cf-7b79-8029-a2fc-d8602eb3a823">브랜치 생성</h2></div><div dir="auto" style="display:contents">

```bash
git checkout -b [your-branch-name]
```

</div><div dir="auto" style="display:contents">

```bash
git checkout -b feat/alarm-clock
```

</div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-808e-be03-c5e3ea29b67b"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80b1-80c5-c53dc5c1477e">📤 만든 브랜치를 GitHub에 푸시</h3></div><div dir="auto" style="display:contents">

```bash
git push -u origin [your-branch-name]
```

</div><div dir="auto" style="display:contents">

```bash
git push -u origin feat/alarm-clock
```

</div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80a6-9220-d6dbcb0755d4"><li style="list-style-type:disc"><code>u</code> 옵션은 이후 <code>git push</code>/<code>pull</code> 시 브랜치 이름 생략 가능하게 연결해줌</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8071-b37e-ec5726dc381d"><li style="list-style-type:disc">다음부터 그냥 push 해도 됨.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80b2-a527-ff06cd8a3eff"><li style="list-style-type:disc">왜 <code>feat/</code> 를 쓰는가?<div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-804a-9700-d8370303b913">브랜치 이름 패턴</p></div><div dir="ltr" style="display:contents"><table class="simple-table" id="331451cf-7b79-80f9-a8b7-c0e7b54cf0ec"><thead class="simple-table-header"><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-806b-b0bd-e48e002da679"><th class="simple-table-header-color simple-table-header" id="YIQu">Prefix</th><th class="simple-table-header-color simple-table-header" id="Zd|O">의미</th><th class="simple-table-header-color simple-table-header" id="NzdN">예시 브랜치명</th></tr></div></thead><tbody><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-80a5-92e7-f68c09bf4a68"><td class="" id="YIQu"><code>feat/</code></td><td class="" id="Zd|O">새로운 기능 추가</td><td class="" id="NzdN"><code>feat/alarm-clock</code></td></tr></div><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-80d5-9c21-ea784b6ce626"><td class="" id="YIQu"><code>fix/</code></td><td class="" id="Zd|O">버그 수정</td><td class="" id="NzdN"><code>fix/overflow-bug</code></td></tr></div><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-8025-bad9-d62cf37fcbdd"><td class="" id="YIQu"><code>refactor/</code></td><td class="" id="Zd|O">코드 리팩토링 (기능 변화 X)</td><td class="" id="NzdN"><code>refactor/thread-init</code></td></tr></div><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-804f-ab0b-e701585a05b2"><td class="" id="YIQu"><code>test/</code></td><td class="" id="Zd|O">테스트 코드 추가/수정</td><td class="" id="NzdN"><code>test/userprog-tests</code></td></tr></div><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-80ba-897b-d2d1394670e7"><td class="" id="YIQu"><code>doc/</code></td><td class="" id="Zd|O">문서, README 수정</td><td class="" id="NzdN"><code>doc/setup-instructions</code></td></tr></div><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-809a-bf32-db9e6edd24b1"><td class="" id="YIQu"><code>chore/</code></td><td class="" id="Zd|O">빌드, 설정 변경 등 잡일</td><td class="" id="NzdN"><code>chore/dockerfile-update</code></td></tr></div><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-8003-afce-e93661397d56"><td class="" id="YIQu"><code>hotfix/</code></td><td class="" id="Zd|O">급한 버그 수정 (배포 후)</td><td class="" id="NzdN"><code>hotfix/build-crash</code></td></tr></div></tbody></table></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-80c6-abb3-f8c1b37300ac"/></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8045-a573-f43c87ec9ec3">왜 이렇게 쓰나?</p></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8001-bead-d7902d4b7f3e"><li style="list-style-type:circle">협업 중에 브랜치가 많아질 때 → <strong>이름만 보고 용도 파악 가능</strong></li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-802a-b392-db00b4b2ca9b"><li style="list-style-type:circle">GitHub Pull Request에서 <strong>자동 정렬이나 필터도 편리함</strong></li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80fc-a6ef-dc2bf21bd8f3"><li style="list-style-type:circle">팀 내부에서 <strong>일관된 스타일 유지 가능</strong></li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80d0-a245-cb79f0d93b1d"><li style="list-style-type:circle">일부 자동화 도구(CI/CD, Release notes)와도 잘 호환됨</li></ul></div></li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80cd-977f-e783f9714054"><li style="list-style-type:disc">VSCode에서 한다면 이렇게 커밋 어디에 하는건지 확인해 볼 수 있음</li></ul></div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-8099-85cd-cea47710f17c"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/pintos-setting/image 5.webp" style="width:670.3203125px"/></figure></div><div dir="auto" style="display:contents"><h1 class="" id="331451cf-7b79-806c-92f3-c573d84a1ade">Github Pull 이후 Error</h1></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8009-9d4f-eb4368a0bef6">이건 맥에서 발생한 것은 아니고, 팀원 윈도우에서 git pull 해온 후 .sh 파일을 실행했을 때 나는 문제다.</p></div><div dir="auto" style="display:contents">

```bash
root@04fedab3f530:~/pintos/src/misc# env SRCDIR=/root/ PINTOSDIR=/root/pintos/ DSTDIR=/usr/local bash ./bochs-2.2.6-build.sh

./bochs-2.2.6-build.sh: line 2: $'\\r': command not found
./bochs-2.2.6-build.sh: line 41: syntax error: unexpected end of file
```

</div><div dir="auto" style="display:contents"><ol class="numbered-list" id="331451cf-7b79-8078-ad3b-df6509d3d828" start="1" type="1"><li><code><strong>$'\\r': command not found</strong></code><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8044-aa38-e22bef73b46a">이 메시지는 파일이 <strong>Windows 스타일 줄바꿈 (CRLF)</strong> 으로 저장되어 있어서 발생하는 것입니다. 유닉스/리눅스에서는 <strong>LF (\n)</strong> 줄바꿈만 사용해야 하므로, 이 스크립트는 리눅스에서 직접 실행되기 전에 포맷을 변환해야 합니다.</p></div></li></ol></div><div dir="auto" style="display:contents"><ol class="numbered-list" id="331451cf-7b79-8052-8dab-c6f7594cf6fb" start="2" type="1"><li><code><strong>syntax error: unexpected end of file</strong></code><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80df-9f68-df2c9e7fdd98">줄바꿈 문제로 인해 쉘이 스크립트의 구조를 제대로 해석하지 못해 끝부분에서 문법 오류가 발생한 것입니다.</p></div></li></ol></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8098-9588-dd28cdf583cf"><li style="list-style-type:disc">윈도우에서 git을 설치하면 기본적으로 다음 설정인데, 이게 문제다.</li></ul></div><div dir="auto" style="display:contents">

```bash
core.autocrlf=true
```

</div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8002-b7dd-d132e2f7b885">이 설정은:</p></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80f8-91cd-ea2e502cb8ba"><li style="list-style-type:disc"><strong>clone/pull 할 때 → CRLF로 변환</strong></li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8080-8822-f5451c2a13af"><li style="list-style-type:disc">commit/push 할 때 → LF로 되돌림</li></ul></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8051-a4eb-fe098b0fe74f">즉, 친구가 pull할 때 <code>.sh</code> 파일이 CRLF로 바뀌어버린 것이다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8064-b529-cf89a747da95">Docker 우분투 컨테이너는 리눅스니까 CRLF 해석 못 함 → 에러 발생</p></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-808c-aecd-e780cfd5be29">해결방법</h3></div><div dir="auto" style="display:contents">

```bash
git config --global core.autocrlf  # 현재 설정 확인
```

</div><div dir="ltr" style="display:contents"><table class="simple-table" id="331451cf-7b79-800b-9238-d8ca16fe38ce"><thead class="simple-table-header"><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-804b-8095-d527dace6cde"><th class="simple-table-header-color simple-table-header" id="ouoW">결과</th><th class="simple-table-header-color simple-table-header" id="u&gt;O&lt;">의미</th></tr></div></thead><tbody><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-8077-98e7-e9a4df7d7f18"><td class="" id="ouoW"><code>true</code></td><td class="" id="u&gt;O&lt;">윈도우용: pull할 때 CRLF, push할 때 LF</td></tr></div><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-8046-bee3-e4d9074e95e1"><td class="" id="ouoW"><code>input</code></td><td class="" id="u&gt;O&lt;">맥/리눅스용: pull할 때 LF 유지, push할 때 LF</td></tr></div><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-806f-ac6c-d877662a0dd8"><td class="" id="ouoW">(아무것도 없음)</td><td class="" id="u&gt;O&lt;">기본값 사용 중 (보통 OS에 따라 다르게 작동)</td></tr></div></tbody></table></div><div dir="auto" style="display:contents">

```bash
git config --global core.autocrlf input
```

</div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8022-baa5-da6febc44235">이미 받은 파일 고치기</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80c7-905d-e7c7aec4458c">그냥 직접 줄바꿈 스타일을 바꿔주는거다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-804e-a83d-d3f47dd95c75">근데 .sh파일 다른것도 많고 이건 그냥 임시방편이니 다시 pull하는걸 추천.</p></div><div dir="auto" style="display:contents">

```bash
sed -i 's/\\r$//' bochs-2.2.6-build.sh
```

</div><div dir="auto" style="display:contents"><h1 class="" id="331451cf-7b79-8079-a69c-c479e6afc62f">FF?</h1></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-804b-bba5-d4b64546cbcb">VSCode로 보면 다음과 같이 FF가 들어간 신기한 문자가 있다.</p></div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-8080-9925-f91ef6c74658"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/pintos-setting/image 6.webp" style="width:395.9921875px"/></figure></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8082-9ac3-e3d1b05d60b4">이 <code>FF</code>는 <strong>Form Feed (줄 바꿈 명령 중 하나)</strong></p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80a5-bfe5-d06c8725f09d">ASCII 코드로는 <code>0x0C</code> (또는 <code>^L</code>) 이고,</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80de-86f8-e66523d640c8">터미널에서는 <strong>페이지 넘김</strong> 역할을 하던 예전 문자</p></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-8008-86a6-f95f0642cdd2"/></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80b8-a3f8-e76db3950bd3"><li style="list-style-type:disc">예전 교재/에디터에서 복붙한 코드</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80df-9692-ebc096e59722"><li style="list-style-type:disc">누군가 <code>.c</code> 파일에 <code>^L</code> 넣어서 구분자처럼 쓰던 습관</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80d8-8912-ead3e75e8e27"><li style="list-style-type:disc">핀토스나 오래된 유닉스 기반 코드에서 가끔 보임.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-806f-9e1e-cdce28d12d28"><li style="list-style-type:disc">VS Code가 특별히 보여주는 거고, <strong>오류는 아님</strong></li></ul></div></div></article><span class="sans" style="font-size:14px;padding-top:2em"></span>