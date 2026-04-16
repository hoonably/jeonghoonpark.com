---
title: "Multi-Agent Drone Exploration"
description: "Developed a multi-agent drone system with autonomous coordination and path planning."
period: "2025.09 – 2025.12"
img: /images/projects/drone-exploration.webp
tech: ["Unity", "Arduino", "C#", "GPS"]
github: https://github.com/hoonably/multi-agent-drone-exploration
---

{% include repository_card.liquid repo_name="hoonably/multi-agent-drone-exploration" %}

**🤝 Contributors** 
- Jeonghoon Park · [@hoonably](https://github.com/hoonably)
- Wooyoung Song · [@SongWooYoung](https://github.com/SongWooYoung)
- Seongji Yang · [@skytre0](https://github.com/skytre0)

---

### Project 1: Rocket Control System 🏆
<a href="https://hoonably.github.io/multi-agent-drone-exploration/Project1_Report.pdf"><img src="https://img.shields.io/static/v1?label=Project1&message=PDF&color=red"></a>

Arduino joystick-controlled rocket simulator with thrust and brake management.

**🥇 1st Place Winner** - Best performance among all teams in the course.

**Core Implementation**: `ControlUnit.cs`
- Analog joystick input processing (A0-A5 ADC values)
- Digital button handling (D2-D6)
- Engine on/off toggle with dead zone filtering
- Servo-based thrust vectoring control
- Brake system management

---

### Project 2: GPS-based Drone Navigation
<a href="https://hoonably.github.io/multi-agent-drone-exploration/Project2_Report.pdf"><img src="https://img.shields.io/static/v1?label=Project2&message=PDF&color=red"></a>

Single drone autonomous navigation through GPS waypoints with checkpoint tracking.

**Core Implementation**: `DroneControlUnit.cs`
- IMU and GPS sensor simulation
- CSV-based servo timeline control
- Checkpoint detection and logging
- Real-time velocity and position tracking
- Automated brake distance calculation

---

### Project 3: Multi-Agent Drone Coordination
<a href="https://hoonably.github.io/multi-agent-drone-exploration"><img src="https://img.shields.io/static/v1?label=Project3&message=PDF&color=red"></a>

Advanced multi-drone system with automatic takeoff, landing, and coordinated exploration.

**Core Implementations**:
- `ControlUnit.cs` - Rocket/carrier control with manual/auto modes
- `DroneControlUnit.cs` - Multi-drone path planning and coordination
- `ServoBehave.cs` - Servo actuation for drone deployment
- `DroneSilo_behave.cs` - Drone silo mechanism control

**Features**:
- Multi-drone deployment from carrier rocket
- Autonomous path planning and exploration
- Coordinated takeoff and landing sequences
- Dynamic checkpoint assignment
- Real-time multi-agent coordination

<br>

<video src="https://github.com/user-attachments/assets/2d125e4c-4e3c-4837-84d9-c4f31afa85b4" width="100%" controls></video>
