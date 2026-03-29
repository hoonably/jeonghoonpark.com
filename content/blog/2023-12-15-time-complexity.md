---
title: "시간 복잡도 (Time Complexity)"
date: 2023-12-15 00:00:00 +09:00
tags: [CS]
category: Study
giscus_comments: true
---


<article class="page sans" id="331451cf-7b79-806b-ae9e-d1e65e81ef63"><header><p class="page-description" dir="auto"></p></header><div class="page-body"><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80e6-912c-c40a86673d2a">시간복잡도를 알아야하는 이유</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-807a-a33c-cbc1487ea7aa">알고리즘 공부나 코딩테스트를 위해 백준 등과 같은 문제를 풀다보면 꼭 마주하는 것이 있다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80bb-80fb-f5ef447261e0">바로 <strong>시간</strong>이다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80b2-a2cc-d74b7e28e31f">실력이 늘다보면 어떠한 방법으로던 문제는 해결하지만,</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80ac-a324-dacda206f495">입력받는 값이 커지면 시간이 기하급수적으로 증가해 제한시간 안에 정답을 도출하지 못한다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80e1-a709-c22b427cf74f">이럴 때 쓰이는게 시간복잡도이다. 시간복잡도를 통해 걸리는 시간을 대략적으로 계산해보면, 문제에 맞는 어떤 알고리즘을 사용해야 할지 판단할 수 있다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8068-bbf0-db5c3c0a676d">백준 단계별 문제에서도 시간복잡도에 대한 파트가 따로 있다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80e7-aecf-df377b892bc6"><a href="https://www.acmicpc.net/step/53">백준 알고리즘 시간 복잡도 단계</a></p></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-803c-86ce-c016e50f3902"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-807c-b6e4-d3bd147e047c">시간 복잡도(Time Complexity)</h3></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8076-88cf-da95392eb4e9"><li style="list-style-type:disc">Big-O(빅-오) ⇒ 최악의 경우 : 가장 오래 걸리는 시간</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80e1-be13-edf3e071b27d"><li style="list-style-type:disc">Big-Ω(빅-오메가) ⇒ 최선의 경우 : 최소한 걸리는 시간</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-807f-88ae-d8c9379f6219"><li style="list-style-type:disc">Big-θ(빅-세타) ⇒ 평균의 경우 : 평균적으로 걸리는 시간</li></ul></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-80b1-9627-f520b3785aed"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8067-b46e-e58289d44639">이해를 위한 예시 - 버블정렬</h3></div><div dir="auto" style="display:contents">

```python
def bubbleSort(arr):
    n = len(arr)
    for i in range(n-1, -1, -1):
        for j in range(0, i):
            if arr[j] arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr
```

</div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8051-882e-c8f015027e5d">arr의 길이가 10만 이하인 테스트 케이스를 넣는다고 하자.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80e6-9894-e72d743c7b9e">그럼 각각 몇번 for문의 반복이 이루어졌는지 계산해보자.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80a9-b3db-ee8103956e26"><strong>Big-O(빅-오)</strong> ⇒ <strong>n=10만</strong>인 경우 : 10만 x 10만 =<strong>100억번</strong> 반복이 이루어진다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80d5-884d-c40826193ce3"><strong>Big-Ω(빅-오메가)</strong> ⇒ <strong>n=1</strong>인 경우 : 1x1번 =<strong>1번</strong> 연산을 수행한다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80d8-af3f-dec42a355db3">이렇듯 테스트 케이스의 값이 작다면 크게 오래걸리지 않겠지만,</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-809d-9376-ce6e7c507e3e">테스트케이스의 값이 커질수록 <strong>엄청난 차이</strong>를 가져올 수가 있다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80d4-be6d-e175d68d14f5">하지만 가장 중요한건 바로 <strong>최악의 경우</strong>인 <strong>Big-O(빅-오)</strong> 이다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80aa-8bf9-e48f98766110">항상 우리는 주어진 시간 내에 해결하기 위해서는 최악의 테스트 케이스를 생각하고 코드를 짜야한다.</p></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-80a0-9a6b-f13a9343e274"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-809d-baa4-d86db8c48f33">Big-O 표기법에 따른 복잡도 그래프</h3></div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-8015-a7b8-f66d61d60276"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/time-complexity/image.webp" style="width: 67.61%; height: auto;"/></figure></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-8087-8c71-d71cfbec1022"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80da-b4bb-da5b0507633d">상수는 무시한다 !</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8031-a1fb-e2122d3e9ea1">다음 예시는 시간복잡도가 <strong>O(n)</strong> 인 코드이다.</p></div><div dir="auto" style="display:contents">

```python
n = int(input())

print('1부터 n까지 2배씩 곱해주어 출력하기')
for i in range(1, n+1):
    i*=2
    print(i, end=' ')
```

</div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80c1-b3a3-ce472c6ac586">그렇다면 다음 코드는 시간복잡도가 O(3n)일까?</p></div><div dir="auto" style="display:contents">

```python
n = int(input())

print('1부터 2n까지 3배씩 곱해주어 출력하기')
for i in range(1, 2*n+1):
    i*=3
    print(i, end=' ')

print('\\n\\n1부터 n까지 2배씩 곱해주어 출력하기')
for i in range(1, n+1):
    i*=2
    print(i, end=' ')
```

</div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80b6-97f5-ddcf7f4ff3e9">상수배를 한다는 것은 숫자가 작다면 큰 차이가 보여지겠지만,</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8053-a42d-d59cc6d36642">나중에 어마어마하게 커진 입력값의 크기에 의한 영향에 비해 아주 작은 차이이다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80f7-8c45-daee66903f3f">그러므로 시간 복잡도에서 우리는 상수는 <strong>무시</strong>한다.</p></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-807a-84b4-e3bd445d49d4"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80f1-ad70-f781b71406cc">O(1) - 상수 시간 (Constant time)</h3></div><div dir="auto" style="display:contents">

```python
n = int(input())

print('입력받은 수를 3으로 나눈 나머지:', n%3)
```

</div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-804e-8a68-e7517cc00887">n에 0이 들어가던 10억이 들어가던 똑같이 한번 연산한다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8076-9771-d4e8bd56ce49">n에 값에 관계 없이 같은 시간이 나오기 때문에 상수 시간인 O(1)이다.</p></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-8013-8294-f205b958ef75"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8090-a0d6-f518de37f734">O(logn) - 로그 시간 (Logarithmic time)</h3></div><div dir="auto" style="display:contents">

```python
def binary_search(target, data):
    data.sort()
    start = 0
    end = len(data) - 1

    while start <= end:
        mid = (start + end) // 2

        if data[mid] == target:
            return mid # 함수를 끝내버린다.
        elif data[mid] < target:
            start = mid + 1
        else:
            end = mid -1
    return None
```

</div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80fb-9e05-df32b8268d2e">위의 코드는 이진 탐색 함수이다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80f4-bb0b-e88e1a81e110"><strong>연산을 할때마다</strong> 탐색해야 할 자료의 갯수가 <strong>1/2</strong>로 줄어들기 때문에, O(logn)이다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80f8-9d4d-cee7c2d12da9">ex) 이진 탐색, 퀵 정렬, 병합 정렬, 힙 정렬</p></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-808e-8e0a-fb9e4aa096ea"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-809b-a735-d3a8ef59ff09">O(n) - 선형 시간 (Linear time)</h3></div><div dir="auto" style="display:contents">

```python
n = int(input())

print('1부터 n까지 2배씩 곱해주어 출력하기')
for i in range(1, n+1):
    i*=2
    print(i, end=' ')
```

</div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80dd-a805-f11d13d1aa46">위의 상수를 무시하는 설명에서 사용했던 예시다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-808c-8c18-e279e0bce600">for문을 통해 n번 연산을 수행하기 때문에 1차함수인 O(n)이다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8092-88ef-ebc3192cb33f">입력값 <strong>n에 비례</strong>해서 연산수가 증가하므로 O(n)이다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80d0-ab5f-d37d21e3656e">ex) n에 대한 for문</p></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-80f3-82cc-fa1efd510674"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8031-be07-d38bf53f854b">O(n²) - 2차 시간 (Quadratic time)</h3></div><div dir="auto" style="display:contents">

```python
n = int(input())
for i in range(1,n+1):
    for j in range(1,n+1):
        print(f'{i} * {j} = {i*j}')
```

</div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8093-923b-fdeb7e786fe1">n에 9를 넣으면 구구단을 출력하고,</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80a0-8916-d6c41090a904">100을 넣으면 <del>백백단</del>을 출력하는 알고리즘이다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80c5-abd3-c3b05f091b46">입력값 <strong>n의 제곱에 비례</strong>해서 연산수가 증가하므로 O(n²)이다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8063-8c32-f9abefd9b4a2">ex)  n에 대한 이중 for문, 삽입정렬, 버블정렬, 선택정렬 , 면적</p></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-8039-8176-c28e7fd0ca84"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8000-8191-e96889e7e562">O(nm) - 두가지 입력값인 경우</h3></div><div dir="auto" style="display:contents">

```python
n = int(input())
m = int(input())
for i in range(1,n+1):
    for j in range(1,m+1):
        print(f'{i} * {j} = {i*j}')
```

</div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-801d-9af2-e09a43b5220e">n에 9, m에 9를 넣으면 구구단을 출력하고,</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8015-90c2-de79788b2a79">n에 100, m에 9를 넣으면 <del>백구단</del>을 출력하는 알고리즘이다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80ee-8beb-cd1873990e81">입력값 <strong>n과 m의 곱에 비례</strong>해서 연산수가 증가하므로 O(nm)이다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8084-b704-ed3d7e638993">ex)  n과 m에 대한 이중 for문</p></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-8052-aac2-ec9e01fe5292"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80b2-8545-e01975d3f1c6">O(2ⁿ) - 지수 시간 (Exponential time)</h3></div><div dir="auto" style="display:contents">

```python
def fibonacci(n):
  if n <= 1:
    return n
  return fibonacci(n-1) + fibonacci(n-2)
```

</div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-809a-8ae8-ea1975ddac6c">가장 좋은 예시인 피보나치수를 재귀함수로 사용할 때이다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-800e-9733-e507f9dc024b">함수를 호출할 때마다 재귀로 함수를 2번씩 호출하기 때문에 2ⁿ에 비례해서 연산 수가 증가한다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80cd-8cc1-e6c82fc38bde">ex) 피보나치 수열</p></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-805b-afae-f59342e0be25"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-801d-8305-fd2aac8572bf">시간 복잡도를 통한 대략적 계산 방법</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80ee-8e06-cb81b2790b84">일반적으로 연산을 1억번 하는데 1초정도 걸린다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-805e-bb2b-f69023a25fc0">문제를 푼다면 시간 복잡도를 통해 주어진 데이터의 범위에 따라</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80f7-ba37-fe3d42ed7496">제한시간에 맞는 알고리즘을 사용해야한다.</p></div><div dir="ltr" style="display:contents"><table class="simple-table" id="331451cf-7b79-8061-b4f1-f91376789d80"><thead class="simple-table-header"><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-80a3-b58a-fb9d3edc519a"><th class="simple-table-header-color simple-table-header" id="@NZR">데이터 수</th><th class="simple-table-header-color simple-table-header" id="blP{">시간복잡도</th><th class="simple-table-header-color simple-table-header" id="twZH">연산 횟수</th><th class="simple-table-header-color simple-table-header" id="VpAa">소요 시간</th></tr></div></thead><tbody><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-8091-b29d-e0088d42d9ef"><td class="" id="@NZR">10⁸</td><td class="" id="blP{">n, logn</td><td class="" id="twZH">1억</td><td class="" id="VpAa">1초</td></tr></div><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-80ab-9222-e39361ac3342"><td class="" id="@NZR">10⁶</td><td class="" id="blP{">nlogn</td><td class="" id="twZH">1억</td><td class="" id="VpAa">1초</td></tr></div><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-80bb-9d0e-f0abc4ac6403"><td class="" id="@NZR">10⁴</td><td class="" id="blP{">n²</td><td class="" id="twZH">1억</td><td class="" id="VpAa">1초</td></tr></div><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-8018-aaa8-c8ee605ded03"><td class="" id="@NZR">500</td><td class="" id="blP{">n³</td><td class="" id="twZH">1억</td><td class="" id="VpAa">1초</td></tr></div><div dir="ltr" style="display:contents"><tr id="331451cf-7b79-8067-bda8-f7b7892f10b2"><td class="" id="@NZR">20</td><td class="" id="blP{">n!, 2ⁿ</td><td class="" id="twZH">1억</td><td class="" id="VpAa">1초</td></tr></div></tbody></table></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-806f-be6a-d315b55ad6ff">
</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-807d-8992-da0cf0c1d20b">
</p></div></div></article><span class="sans" style="font-size:14px;padding-top:2em"></span>