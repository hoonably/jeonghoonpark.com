---
title: "[C++] C++ 버전 체크 방법"
date: 2024-04-13 00:00:00 +09:00
tags: [C++]
category: Study
giscus_comments: true
---


<article class="page sans" id="331451cf-7b79-80db-b9a3-d8fee60cee9f"><header><p class="page-description" dir="auto"></p></header><div class="page-body"><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80c4-9a51-dd71db97953b">버전이 궁금했던 이유</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80f4-9ce3-c6030ae43af8">분명히 VSCode에서 C++17로 설정을 바꿔줬는데,</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80c7-807f-d219525d94f6">C++17 부터 가능한 auto tuple, pair unpacking을 하면 오류가 발생해서 뭐지 하면서 확인해봤다.</p></div><div dir="auto" style="display:contents">

```cpp
auto [x, y] = q.front();
```

</div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8073-be60-fcb43aaa77a2">알고보니 GCC version이 낮아서 C++17 명령어를 입력해도 17로 실행이 안됐던 것이다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-809f-9e7e-f2e8652618ae">그래도 이런 것 덕분에 버전체크하는 법도 알아냈다.</p></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-8033-8cf3-ee569e056808"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-802b-ae4e-efbff4f98a91">버전 체크 (C++)</h3></div><div dir="auto" style="display:contents">

```cpp
#include <iostream>
using namespace std;

int main() {
    if (__cplusplus == 201703L)
        cout << "C++17" << endl;
    else if (__cplusplus == 201402L)
        cout << "C++14" << endl;
    else if (__cplusplus == 201103L)
        cout << "C++11" << endl;
    else if (__cplusplus == 199711L)
        cout << "C++98" << endl;
    else
        cout << "pre-standard C++" << endl;
}
```

</div></div></article><span class="sans" style="font-size:14px;padding-top:2em"></span>