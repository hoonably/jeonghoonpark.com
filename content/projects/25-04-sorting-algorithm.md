---
title: "Sorting Algorithm Analysis"
description: "Benchmarked and analyzed multiple sorting algorithms"
period: "2025.03 – 2025.04"
img: /images/projects/sort.webp
tech: ["C++", "Algorithms"]
github: https://github.com/hoonably/sorting-project
pdf: https://hoonably.github.io/sorting-project/
---

{% include repository_card.liquid repo_name="hoonably/sorting-project" %}

---

<div style="position: relative; width: 100%; padding-top: 100%; overflow: hidden;">
  <iframe 
    src="https://drive.google.com/file/d/1JRzbe4nSZlnCGPbagfk-5DV2E26qtlat/preview"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    frameborder="0"
    allowfullscreen
  ></iframe>
</div>

---

### 💬 Thoughts

What I enjoyed most about the sorting algorithm project was seeing just **how many different ways** there are to solve what seems like the same problem.
There’s no “best” sorting algorithm — each one has its strengths depending on the situation, whether it’s input size, distribution, or memory constraints.

It was also fascinating to realize that even something as old and “solved” as sorting is still an **active area of research**, with ideas like hybrid sorting (e.g. TimSort) used in modern languages like C++ and Python. I used to take built-in sort functions for granted, but now I see the layers of design behind them.

Studying lesser-known algorithms like **Library Sort** through actual papers was honestly hard — especially figuring out the rebalancing logic — but that made it more satisfying.
It wasn’t just copy-pasting theory; I had to implement, debug, and understand the weird edge cases on my own.

Also, using **Overleaf** for the first time felt like writing a real paper — start to finish, with figures, tables, and everything. That gave me a strong sense of completion, way more than a normal homework writeup.

In the end, this project reminded me that even for problems we “understand,” there’s still depth left to explore — and solving them well still takes **engineering, not just theory**.

---

### 💬 느낀 점

이번 정렬 알고리즘 프로젝트에서 가장 재밌었던 건, 같은 정렬 문제라도 알고리즘이 정말 다양하다는 점이었다.
무조건 빠른 게 좋은 게 아니라, 상황(데이터 분포, 메모리 제약, 입력 크기 등)에 따라 각각 장단점이 다르다는 게 신기했다.

또, 정렬처럼 고전적이고 “이미 다 연구된 것 같은 주제”에도 아직까지 하이브리드 알고리즘처럼 새로운 시도들이 이어지고 있다는 사실이 놀라웠다.
C++이나 Python 표준 라이브러리에 들어 있는 TimSort도 이번에 처음 제대로 원리를 알게 되었고,
그동안은 그냥 `.sort()` 써도 당연한 걸로 생각했는데, 그 안에도 수많은 최적화가 있다는 걸 깨달았다.

**Library Sort** 같이 잘 알려지지 않은 알고리즘은 논문 보고 구현하는 게 진짜 어려웠다.
갭 재배치 로직 같은 건 디버깅하면서 이해해야 했고, 중간에 잘못된 구현 때문에 정확도도 낮게 나와서 엄청 고생했다.
그래도 내가 **직접 논문 보고 구현하고, 논문처럼 작성해서 정리한 과정 자체가 뿌듯했다**.

**Overleaf** 처음 써봤는데, 그냥 과제하는 느낌이 아니라 진짜 논문 쓰는 느낌이라 완성하고 나니까 성취감도 훨씬 컸다.

정렬이라는 익숙한 문제도 파고들다 보면 결국 이론 + 구현 + 최적화가 다 들어가는 종합 문제라는 걸 다시 느꼈다.
단순히 정답만 구하는 게 아니라, 조건에 따라 좋은 선택을 하는 것 자체가 알고리즘 설계라는 걸 배운 것 같다.
