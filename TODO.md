# To Do

## Persistent Memory

The idea that you can tell Claude that if he sees something in the conversation about
some subject, to log it. This uses an MCP server to stuff the realization into a system-
wide DB somewhere, so he can use that info on other chats.

I saw this idea browsing some MCP plugins on Github. It told Claude that if he noticed
any relevant information about the user, to note it with this tool. So that, over time,
Claude would better understand the user. Sounds creepy to me, but the base idea seems
good - to reuse information from one chat into others. Creepy that the original idea
was to remember things about the user, but hey. (Admittedly, the examples that the repo
gave seemed OK: the intention was that if the user told Claude that 2-space tabs are
preferred, that info could be used across projects.)

### Have Claude "log" everything.

The idea is that every response from Claude could inform what I am working on across the
workday, making it easier for continuity of work for the human.

#### 2

In discussions, Claude might spot that one task is dependent on another, or the user could
signal it. Claude could then use a tool to setup that dependency. Think of Jira "blocked by".

For me, a tool that instantly enters tasks and deps would be perfect.
