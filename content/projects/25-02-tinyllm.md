---
title: "TinyLLM"
description: "Explored efficient LLM architectures for on-device environments."
period: "2025.01 – 2025.02"
img: /images/projects/tinyllm.webp
tech: ["Python", "PyTorch", "LLM", "On-Device AI"]
github: https://github.com/hoonably/TinyLLM
---

{% include repository_card.liquid repo_name="hoonably/TinyLLM" %}

---

### 💬 Thoughts

This was the very first project I worked on after joining a research lab as an intern — and honestly, it felt like a proper first project. On my first day, I was handed a Jetson Nano and told to set it up. My first thought was: what is this? It's so slow and frustrating! That was basically my first real encounter with Ubuntu. It felt like dealing with an old computer, but surprisingly it supported CUDA (though not the latest versions).

At the time, I had no idea what I was even doing. Dataset? HuggingFace? What are those? I only started to get it after seeing others measuring accuracy — oh, so this is on-device AI! It's running entirely on this GPU without any server. That’s when it clicked. When I saw models getting only 30% accuracy, I was like, is this even working? Feels like random guessing. Turns out it was because no fine-tuning had been done yet.

It was also fascinating to learn that there are so many tiny LLMs out there, and the goal was to compare them in terms of latency and accuracy to see which ones perform best.

I also got introduced to WandB and started learning how to write automation scripts. It was actually my first time automating anything. Since the measurements were slow and involved lots of repetition, I finally understood why automation matters. Ever since then, I’ve preferred automating workflows in all my projects.

Looking back, I had no idea what I was doing and just followed along at first — but I think my professor intentionally gave me this as a starting point: explore whether LLMs could run on small edge devices and what kind of efficiency they could reach. But along the way, I ended up learning so many valuable things — Docker, WandB, automation, conda environments, data visualization, and more.

It might not seem like a big deal later, but for someone who started out knowing nothing, this was a really important project. It gave me a solid foundation and made me feel like I was finally part of a research group.

---

### 💬 느낀 점

처음으로 연구실 인턴을 시작하면서 진행한 프로젝트다. 사실상 첫 프로젝트 다운 프로젝트인 것 같다. 들어가자마자 Jetson Nano를 주셔서 세팅을 해보면서 와 이게 뭐지? 완전 느리고 답답하다! 하면서 실제 우분투를 사실상 처음 만져봤다. 옛날 컴퓨터 만지듯이 답답했는데 GPU는 또 CUDA가 지원이 되네? (물론 최신버전은 안됨)

처음에 이게 뭐하는건지도 몰랐는데, 데이터셋? 허깅페이스? 이게 뭐지? 하다가 다른 분들이 정답률 체크하는거 보고 아! 이게 온디바이스 AI구나! 서버 없이 이 GPU로 돌리는거구나! 깨달았다. 근데 정답률 30% 나오는거보고 "이게 맞나? 찍는거랑 똑같은데?" 했는데 그냥 finetunning 안하고 돌려서 그런 것 같다. Tiny한 LLM들이 생각보다 여러가지가 있고, 그중에서 어떤 것이 Latency와 정확도가 괜찮은지 체크해보는게 신기했다.

그러면서 MLOps인 WandB도 알게 되었고, 자동화 스크립트를 만들어서 하는 방법도 알게 되었다. 사실 자동화는 처음 써봤다. 측정이 오래걸리고 같은 작업을 반복하다보니 자동화를 왜 쓰는지 이해가 되었고, 이 이후 프로젝트에서도 자동화를 선호하게 되었다.

얼렁뚱땅 처음에 몰라서 따라가기만 했지만, 결국 작은 On-device에서도 돌리기 위한 LLM이 있는지, 어느정도의 효율이 나오는지 알아보라고 교수님이 첫 시작을 던져준 것 같다. 근데 생각보다 Docker, WandB, 자동화, conda, 환경세팅, 데이터 시각화 등등... 다른 부분에서도 엄청난 도움이 되었다. 나중가면 별거 아닌것 처럼 보이지만, 아무것도 몰랐던 나에게 많은 정보들을 알게해준 좋은 연구실의 시작지점이라서 기억에 남는 것 같다.