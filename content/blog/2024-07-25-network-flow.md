---
title: "네트워크 플로우 (Network-Flow)"
date: 2024-07-25 00:00:00 +09:00
tags: [C++, PS]
category: Algorithm
giscus_comments: true
---


<article class="page sans" id="331451cf-7b79-8026-82f9-c20ceb1950c0"><header><p class="page-description" dir="auto"></p></header><div class="page-body"><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-80e5-a207-de3205f80fe2">네트워크 플로우?</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8036-9c5f-fd19f2dec310">네트워크 플로우 문제는 주어진 유량 네트워크에서 소스(source)에서 싱크(sink)로 보낼 수 있는 <strong>최대 유량</strong>을 찾는 문제다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-803b-8995-ee54af4ba9c1">네트워크는 노드(node)와 간선(edge)으로 구성된 그래프로 표현되며, 각 간선은 용량(capacity)을 가진다.</p></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-80bf-8388-e50cabd7c18f"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8048-adf0-ce93b46720ca">용어</h3></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8093-8b16-ef98e73ed228"><li style="list-style-type:disc"><strong>노드(Node)</strong>: 그래프에서 유량이 흐르는 지점.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80e8-b935-ece3ce9528e7"><li style="list-style-type:disc"><strong>간선(Edge)</strong>: 두 노드를 연결하는 선으로, 유량이 흐르는 통로. 각 간선은 용량(capacity)이라는 최대 유량을 가진다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-808c-b88d-d4d9d45260a8"><li style="list-style-type:disc"><strong>소스(Source)</strong>: 유량이 시작되는 지점.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8097-9d0c-df0ac00705ea"><li style="list-style-type:disc"><strong>싱크(Sink)</strong>: 유량이 도착하는 지점.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-801f-8e44-f20aa0a2a3e3"><li style="list-style-type:disc"><strong>잔여 용량(Residual Capacity)</strong>: 현재 유량을 고려했을 때 간선이 추가로 유량을 보낼 수 있는 여유.</li></ul></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-8018-b276-e0a08e8d9c68"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-801b-ad3b-d90fd87d6ff2">네트워크 플로우 기본 문제</h3></div><div dir="ltr" style="display:contents"><figure class="image" id="331451cf-7b79-80bd-bb41-d5e03ca1d7d3"><img class="img-fluid rounded z-depth-1 px-to-pct" loading="lazy" src="/images/blog/network-flow/image.webp" style="width:670.3203125px"/></figure></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-80e9-9d4f-c0cc481ba19f"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-806a-9bd0-efe4e0d09b7a">포드-풀커슨 알고리즘 (Ford-Fulkerson Algorithm)</h3></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8000-90c6-d81ffe8c5f56"><li style="list-style-type:disc"><strong>방식</strong>: 가능한 경로를 반복적으로 찾아 유량을 보내며, 더 이상 유량을 보낼 수 없을 때까지 반복</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80b2-a479-e65fba420ed0"><li style="list-style-type:disc"><strong>시간 복잡도</strong>: <code>O((V+E)F)</code> - 여기서 V는 노드 수, E는 간선 수, F는 최대 유량</li></ul></div><div dir="auto" style="display:contents">

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int INF = 0x3f3f3f3f;  // 1061109567
// const ll INF = 0x3f3f3f3f3f3f3f3f;

/*--
네트워크 플로우

포드-풀커슨
O((V+E)F)
V: 노드 수, E: 간선 수, F: 최대 유량
*/

const int vertexSZ = 1000;  // in out 분할이라면 2배
const int SZ = vertexSZ+5, bias = vertexSZ/2;
int SRC = vertexSZ+1, SINK = vertexSZ+2;

struct FordFulkerson {
    using FlowType = int;

    vector<int> graph[SZ];
    FlowType capacity[SZ][SZ], flow[SZ][SZ];
    bool visited[SZ];

    void addEdge(int _from, int _to, FlowType _cap, FlowType _caprev = 0) {
        graph[_from].push_back(_to);
        graph[_to].push_back(_from);
        capacity[_from][_to] += _cap;
        capacity[_to][_from] += _caprev;
    }

    bool DFS(int now, int T, FlowType& minFlow) {
        if (now == T) return true;
        visited[now] = true;
        for (int next : graph[now]) {
            if (!visited[next] && capacity[now][next] > flow[now][next]) {
                FlowType residual = capacity[now][next] - flow[now][next];
                if (DFS(next, T, minFlow)) {
                    minFlow = min(minFlow, residual);
                    flow[now][next] += minFlow;
                    flow[next][now] -= minFlow;
                    return true;
                }
            }
        }
        return false;
    }
    FlowType maxFlow(int S = SRC, int T = SINK) {
        memset(flow, 0, sizeof(flow));
        FlowType totalFlow = 0;
        FlowType minFlow;
        while (true) {
            memset(visited, false, sizeof(visited));
            minFlow = INF;
            if (!DFS(S, T, minFlow)) break;
            totalFlow += minFlow;
        }
        return totalFlow;
    }

    void initGraph() { // 테스트케이스를 위한 그래프 초기화
        for (int i = 0; i < SZ; i++) graph[i].clear();
        memset(capacity, 0, sizeof(capacity));
        memset(flow, 0, sizeof(flow));
    }
}nf;
```

</div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-80b2-824c-df204e24648e"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8052-b0b1-c3b8fcf81362">디닉 알고리즘 (Dinic’s Algorithm)</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80fd-ab52-e99d15e588e1">디닉 알고리즘은 포드-풀커슨 알고리즘의 개선된 버전으로,</p></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8040-9fc3-e558a152ae3f"><li style="list-style-type:disc">레벨 그래프(Level Graph)를 사용하여 **블로킹 플로우(Blocking Flow)**를 반복적으로 찾는 알고리즘이다.</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8015-afa3-f057cab54aea"><li style="list-style-type:disc"><strong>기본 개념</strong>: <strong>BFS</strong>를 사용하여 레벨 그래프를 만들고, <strong>DFS</strong>를 사용하여 블로킹 플로우를 찾음</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8072-800c-d80b7ae685dd"><li style="list-style-type:disc"><strong>시간 복잡도</strong>: <code>O(V^2 * E)</code></li></ul></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8081-846c-d92c33eef736">이 방법 외에 다음에는 Edge 구조체를 사용하는 방법을 알려줄건데, 구조체가 더 빠르다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8051-b0f7-f6b7c6426f7f">하지만, 배열을 이용하는 방법이 편할 때가 있다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80df-a5e6-c07326d2a4a5"><a href="https://www.acmicpc.net/problem/2365">백준 숫자판 만들기</a> 문제처럼, setCap함수를 사용하여 Cap을 이분탐색으로 찾아주는 문제가 있다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80e8-b0b3-ff5653941b3a">이 외에도, 개별 flow를 출력해야 한다면 구조체 사용보다 용이하다.</p></div><div dir="auto" style="display:contents">

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int INF = 0x3f3f3f3f;  // 1061109567
// const ll INF = 0x3f3f3f3f3f3f3f3f;

/*--
네트워크 플로우

디닉 알고리즘 O(V^2E)

flow와 cap을 따로 관리하기 때문에 Edge 구조체 사용보다 느림.

But, 나중에 개별 flow를 출력해야한다면 용이
ex) 숫자판 만들기 <https://www.acmicpc.net/problem/2365>
*/

const int vertexSZ = 1000;  // in out 분할이라면 2배
const int SZ = vertexSZ+5, bias = vertexSZ/2;
int SRC = vertexSZ+1, SINK = vertexSZ+2;

struct NetworkFlow{  // use Dinic

	using FlowType = int;

	FlowType flow[SZ][SZ], capacity[SZ][SZ];
	vector<int> graph[SZ];

	// 마지막 인자를 안쓰면 유방향, cap과 같게 쓰면 무방향(양쪽 cap 같음)
	void addEdge(int from, int to, int cap, int caprev = 0) {
		graph[from].emplace_back(to);
		graph[to].emplace_back(from);
		capacity[from][to] += cap;
		capacity[to][from] += caprev;
	}

	int level[SZ], work[SZ];
	bool BFS(int S, int T){
		memset(level, 0, sizeof(level));
		queue<int> q; q.push(S); level[S] = 1;
		while(!q.empty()){
			int now = q.front(); q.pop();
			for(int &next : graph[now]){
				if(!level[next] && capacity[now][next]-flow[now][next]>0) {
					q.push(next), level[next] = level[now] + 1;
				}
			}
		}
		return level[T];
	}
	FlowType DFS(int now, int T, FlowType f){
		if(now == T) return f;
		for(; work[now] < (int)graph[now].size(); work[now]++){
			int next = graph[now][work[now]];
			if(level[next] != level[now] + 1 || capacity[now][next]-flow[now][next]==0) continue;
			FlowType ret = DFS(next, T, min(f, capacity[now][next]-flow[now][next]));
			if(!ret) continue;
			flow[now][next]+=ret;
			flow[next][now]-=ret;
			return ret;
		}
		return 0;
	}
	FlowType maxFlow(int S = SRC, int T = SINK){
		memset(flow, 0, sizeof(flow));
		FlowType ret = 0, minFlow;
		while(BFS(S, T)){
			memset(work, 0, sizeof(work));
			while((minFlow = DFS(S, T, INF))) ret += minFlow;
		}
		return ret;
	}

	void init(){  // for Test Case
		memset(capacity, 0, sizeof(capacity));
		for(int i=0; i<SZ; i++) graph[i].clear();
	}

	// 중간 연결 cap를 모두 Mid로 설정하고 이분탐색으로 찾기 위해서 c로 변경시켜주는 함수
	// SRC와 SINK와의 연결은 건드리지 않는게 포인트
	void setCap(int N, int c){
		for (int i=1; i<=N; i++)
			for (int j=1; j<=N; j++)
				capacity[i][j+bias]=c;
	}

	// Flow를 출력
	void printFlow(int N){
		for (int i=1; i<=N; i++){
			for (int j=1; j<=N; j++){
				cout << flow[i][j+bias] << ' ';
			}
			cout << '\\n';
		}
	}
}nf;
```

</div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-8027-855d-f3b576306535"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8006-a0aa-fe6f6ddf40c7">디닉 알고리즘 (Dinic’s Algorithm) 구조체 사용</h3></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-802a-beba-c6f30b96f2ee">위의 디닉 알고리즘보다 더 빠른 방식이 바로 Edge 구조체를 사용하는 방식이다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8049-a1c4-f98e202b032c"><strong>Edge 구조</strong>: 두 번째 코드에서는 Edge 구조체를 사용하여 각 간선을 저장</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-80a4-aec0-e67b6a58172b">각 간선은 목적지 <strong>노드 (to)</strong>, <strong>역간선의 인덱스 (rev)</strong>,  **용량 (cap)**을 포함한다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-801c-af85-dea335dfd713">이전 방식의 <strong>capacity</strong>와 <strong>flow</strong>를 별도로 업데이트하는 것보다 효율적이다.</p></div><div dir="auto" style="display:contents"><p class="" id="331451cf-7b79-8022-82b2-cd6bc19fc367">이는 특히 많은 간선을 다루는 경우 성능 향상을 가져올 수 있다.</p></div><div dir="auto" style="display:contents">

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int INF = 0x3f3f3f3f;  // 1061109567
// const ll INF = 0x3f3f3f3f3f3f3f3f;

/*--
네트워크 플로우

디닉 알고리즘 O(V^2*E)

Edge 구조체 사용으로 매우 빠름

단, cap에 현재 flow를 직접 저장하기 때문에, 실시간으로 바뀌어서
flow를 수정하면서 문제를 푸는 문제에서는 일일이 수정해줘야 해서 불편
*/

const int vertexSZ = 1000;  // in out 분할이라면 2배
const int SZ = vertexSZ+5, bias = vertexSZ/2;
int SRC = vertexSZ+1, SINK = vertexSZ+2;

struct NetworkFlow{  // use Dinic

    using FlowType = int;

    struct Edge{ int to, rev; FlowType cap; };
    vector<Edge> graph[SZ];
    int level[SZ], work[SZ];

    // 마지막 인자를 안쓰면 유방향, cap과 같게 쓰면 무방향(양쪽 cap 같음)
    void addEdge(int _from, int _to, FlowType _cap, FlowType _caprev = 0){
        graph[_from].push_back({_to, (int)graph[_to].size(), _cap});
        graph[_to].push_back({_from, (int)graph[_from].size()-1, _caprev});
    }

    void initGraph(){ // for Test Case
        for (int i=0; i<SZ; i++) graph[i].clear();
    }

    bool BFS(int S, int T){  // make level graph
        memset(level, 0, sizeof(level));
        queue<int> q; q.push(S); level[S] = 1;
        while(!q.empty()){
            int now = q.front(); q.pop();
            for(const auto &next : graph[now]){
                if(!level[next.to] && next.cap) q.push(next.to), level[next.to] = level[now] + 1;
            }
        }
        return level[T];
    }
    FlowType DFS(int now, int T, FlowType flow){  // find Blocking Flow
        if(now == T) return flow;
        for(; work[now] < (int)graph[now].size(); work[now]++){
            auto &next = graph[now][work[now]];
            if(level[next.to] != level[now] + 1 || !next.cap) continue;
            FlowType ret = DFS(next.to, T, min(flow, next.cap));
            if(!ret) continue;
            next.cap -= ret;
            graph[next.to][next.rev].cap += ret;
            return ret;
        }
        return 0;
    }
    FlowType maxFlow(int S = SRC, int T = SINK){
        FlowType ret = 0, minFlow;
        while(BFS(S, T)){
            memset(work, 0, sizeof(work));
            while((minFlow = DFS(S, T, INF))) ret += minFlow;
        }
        return ret;
    }
} nf;
```

</div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-8090-8361-ca91782c535a"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8039-b8ed-c1b4952f8c6f">풀어볼 문제들</h3></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8078-8129-fdaed59c8a3b"><li style="list-style-type:disc"><a href="https://www.acmicpc.net/problem/17412">도시 왕복하기 1</a> : 기본 Network Flow 문제</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80c8-b75c-e8dbd8f7d371"><li style="list-style-type:disc"><a href="https://www.acmicpc.net/problem/11378">열혈강호 4</a> : Brunch 생성 후 이어주기</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8055-8597-fb13a555eef9"><li style="list-style-type:disc"><a href="https://www.acmicpc.net/problem/2316">도시 왕복하기 2</a> : in, out 정점 분할</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8049-99fa-e2bbec42fd3f"><li style="list-style-type:disc"><a href="https://www.acmicpc.net/problem/11495">격자 0 만들기</a> : 간선 양이 매우 많아 Dinic 알고리즘이 100배 빠름</li></ul></div><div dir="auto" style="display:contents"><hr id="331451cf-7b79-807b-8d9c-f81465691c5f"/></div><div dir="auto" style="display:contents"><h3 class="" id="331451cf-7b79-8059-a19f-c20f61dac895">네트워크 플로우의 활용 예시</h3></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80f6-ac6e-dff0f9eed141"><li style="list-style-type:disc"><strong>물류</strong>: 특정 지점에서 다른 지점으로 물건을 최대한 많이 보내는 문제</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-8023-9214-e5704419c142"><li style="list-style-type:disc"><strong>통신망</strong>: 네트워크의 대역폭을 최대한 활용하여 데이터를 전송하는 문제</li></ul></div><div dir="auto" style="display:contents"><ul class="bulleted-list" id="331451cf-7b79-80ed-8495-c895ea08dffa"><li style="list-style-type:disc"><strong>전력망</strong>: 발전소에서 도시로 전력을 최대한 효율적으로 보내는 문제</li></ul></div></div></article><span class="sans" style="font-size:14px;padding-top:2em"></span>