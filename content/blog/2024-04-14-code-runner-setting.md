---
title: "[VSCode] Code Runner을 위한 setting.json 설정"
date: 2024-04-14 00:00:00 +09:00
tags: [VSCode]
category: Tip
giscus_comments: true
---


<article class="page sans" id="331451cf-7b79-800e-a5b9-df6de83e758e"><header><p class="page-description" dir="auto"></p></header><div class="page-body"><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8012-be56-edabfec1822c">setting.json ?</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8020-80e0-cd82497291dc">vscode에서 setting.json 이란 파일이 있다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80ad-a500-fd015ecf2ded"><code>crtl(cmd)+shift+P</code> 후 user setting을 검색해서 JSON을 클릭하면 된다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8072-a06b-d4bd4929a900">이 작업 영역에서 setting을 어떻게 할 지에 대해서 설정한다.</p></div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-80c3-88b0-cdda10ded6d3"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/code-runner-setting/image.webp" style="width:670.328125px"/></figure></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-805a-9c64-f3d1bc586e14"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-803f-b97b-efc8ce4e92a5">Code Runner 띄어쓰기</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-804e-99ea-f3e2455c213f">기본적으로 Code Runner에서, 파일명에 띄어쓰기 등과 같은 것이 있으면</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-804a-908d-d0712b051b49">터미널로 옮겨적을때 띄어쓰기로 인식해서 정상적으로 컴파일되지 않는다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-801c-9031-fd64cd6fae83">그래서 파일명을 항상 _ 와 같은 것을 사용했는데, 불편함이 있었다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80a1-baf9-c34f073791d1">이는 " " 를 사용하여 파일명을 감싸주면, 파일에 띄어쓰기나 .이 있어도 정상적으로 컴파일된다.</p></div><div dir="auto" style="display:contents">

```json
// 파일명 띄어쓰기 안됨
"cpp": "cd $dir && g++ -std=c++17 $fileName -o $fileNameWithoutExt && ./$fileNameWithoutExt"

// 파일명 띄어쓰기 가능
"cpp": "cd $dir && g++ -std=c++17 \\"$fileName\\" -o \\"$fileNameWithoutExt\\" && ./\\"$fileNameWithoutExt\\""
```

</div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-80dc-9714-c7c3bf170f19"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8092-9192-cabfa28d727a">setting.json</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-806d-a831-d513aa3ab4d8">아래 내용을 복붙해 이런식으로 넣으면 된다.</p></div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-806a-ba92-d7a63bc0013b"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/code-runner-setting/image 1.webp" style="width:913.984375px"/></figure></div><div dir="auto" style="display:contents">

```json
{
    "code-runner.executorMap": {
        "javascript": "node",

        // 실행 파일 무조건 안전하게 삭제
        // trap "rm -f ..." EXIT;는 스크립트가 정상 종료되든 중단(ctrl+c 같은 작업)되든 간에 EXIT 시그널에 의해 실행됨
        "java": "cd $dir && javac \\"$fileName\\" -d . && (trap 'rm -f tempCodeRunnerFile.class' EXIT; java tempCodeRunnerFile)",
        "c": "cd $dir && gcc \\"$fileName\\" -o tempCodeRunnerFile && (trap 'rm -f tempCodeRunnerFile' EXIT; ./tempCodeRunnerFile)",
        "cpp": "cd $dir && clang++ -std=c++17 \\"$fileName\\" -o tempCodeRunnerFile && (trap 'rm -f tempCodeRunnerFile' EXIT; ./tempCodeRunnerFile)",

        "python": "python3",
        "ruby": "ruby",
        "spim": "spim -file \\"$fileName\\""
    },

    "code-runner.preserveFocus": false,  // 파일 실행해도 실행 텍스트 포커스 유지하는 옵션
    "code-runner.saveFileBeforeRun": true,  // 실행버튼 누르면 자동으로 저장하고 실행하는 옵션
    "code-runner.runInTerminal": true,  // 터미널에서 실행하는 옵션 (이걸 켜야 입력 가능)

    "cmake.configureOnOpen": true,
    "code-runner.ignoreSelection": true,
    "files.associations": {
        "*.scm": "racket",
        "iostream": "cpp",
        "__bit_reference": "cpp",
        "ios": "cpp",
        "regex": "cpp",
        "queue": "cpp",
        "vector": "cpp",
        "deque": "cpp",
        "forward_list": "cpp",
        "list": "cpp",
        "string": "cpp",
        "valarray": "cpp",
        "tuple": "cpp",
        "__hash_table": "cpp",
        "__split_buffer": "cpp",
        "__tree": "cpp",
        "array": "cpp",
        "initializer_list": "cpp",
        "map": "cpp",
        "set": "cpp",
        "string_view": "cpp",
        "unordered_map": "cpp",
        "unordered_set": "cpp"
    },


    // 윈도우용 (윈도우에서도 같은 폴더를 USB나 Cloud로 공유해서 쓴다면 해놓자.)
    // "C_Cpp.default.compilerPath": "C:\\\\MinGW\\\\bin\\\\g++.exe",
}
```

</div></div></article><span class="sans" style="font-size:14px;padding-top:2em"></span>