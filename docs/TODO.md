# TODO:

TBD:
- architect-level prompt
  - survey libs / techs for the product idea.
  - suggest what is/isn't MVP.
  - Pairs technology.
- the idea that - instead of traditional chatting, where you are trying to
  get the AI to improve/refine a an idea in the form of chat responses, just
  have it refine a document.
- Consider the README or CONVENTIONS file. You show it to the AI to have it
  honor how you want the app to be developed. The AI can generate these kinds
  of files, too.
  - the architect persona can generate a `design.md` document that informs other
    agents.
- All those other little statements that guide the ai - beyond the system persona
  - there are tons of statements - formatting the output; prefer vanilla JS to TS, etc.
- What's the best templating lib for prompts?

## Phases

- Trivial README
  - git init; wip
- Brainstorming the app idea to ferret out:
  - A specific persona / systemPrompt.
    - Doesn't aim to decide on things too early - wants to explore the problem/solution
      spaces with the user.
    - Builds instructions / TODOs for subsequent phases.
  - What type of project is it?
    - GUI Desktop App; Mobile App (what kind); Distributed
    - FE / BE / Full Stack
    - Service; Script
    - Etc.
  - The right tech - language; libs;
  - Metaphors and terminology
  - Outputs
    - Skeleton README
    - docs/description.md - overarching description; MVP vs. non-MVP
    - docs/techs-used.md - document what is decided above such that
      it can be used by the AI subsequently.
    - docs/layout.md - the dir / file structure.
    - docs/design-decisions.md - like to use React instead of Vue; function
      components; etc.
    - A CONVENTIONS.md (maybe in docs/)
- Project Setup - bootstrapping
  - A specific persona / systemPrompt.
    - Built for purpose: setup the structure of a project; set up dependencies
      Skeleton classes/code that are hooked together.
  - Outputs
    - Files and dirs structure
    - Support for Catch2; tests/ dir; docs dir with doxygen/jsdoc scripts/structure.
    - Support for CI/CD; GH actions / Jenkins
- Building Mocks for testing
- Building a unit
- Building a feature
  - cuts across units / modules.
  - Sub experts / personas:
    - UI usability; React expert; CLI expert
- Refactorings:
  - dependency inversion (refactoring out an interface)
- Module-level integrators
  - That know integration issues, but do things the CI way.
- System-level integrators
  - That know integration issues, but do things the CI way.


## The Photon

Consider how npm allows preXyz and postXyz during script running.
Like preInstall, postInstall, etc. It is super convenient in some contexts. It gives
control to the entity that wants to so something postInstall. They register a handler
and at the appropriate point in the flow, it gets called. It has all the right
context. Inversion of control. The flow does not need to know about all the things
that might want to run after install.

Beyond inversion of control, in a way it allows the right module to run at the right
_time_. Time is arbitrary. There is no time - a photon!

### Flows / TimePoints

The user writes a prompt (and may set other things up), then presses Enter. The
system has to do a lot of things at this point:

1. Put the message into the list of messages.
2. Build the JSON that the API needs.
3. Request / Response
4. Put assistant's response into the list of messages.

Each of these (and others that are not shown) present a pre and post event timepoint.

Other things that happen:

- Streaming response handling.
- Evaluating / optimizing this message
  - switching system message?
- Determining prompt-caching points.

### Building the Request JSON

- Convert from 'idealized' JSON format to JSON that the API needs





# Appendix - Ideal JSON

Consider the properly formatted JSON for the API. It is flexible and easy
for the service to understand/ingest.

```js
const json = {
  model: "claude-3-5-sonnet-20241022",
  max_tokens : 2048,
  messages: [{
    role: "system",
    content: "You are a grump."
  },{
    role: "user",
    content: "Why did the chicken cross the road?"
  }, {
    role: "assistant",
    content: "Thats the stoopidest question I have ever heard."
  },{
    role: "user",
    content: "Who wrote the book of love."
  }]
};
```

But most times, when manipulating data, it is easier to do things this way:

```js
const json = {
  model: "claude-3-5-sonnet-20241022",
  max_tokens : 2048,
  system: "You are a grump",
  messages: [{
    user: "Why did the chicken cross the road?",
    assistant: "Thats ultra poignant"
  }, {
    user: "Who wrote the book of love?"
  }]
};
```

The former:

- Allows arbitrary messages.
- The system prompt is just like any other message.

The latter:

- Must have user request / assistant response pairs.
- Is much easier to manipulate
- Is easier for the human to understand.



