import React from "react"
import { mount } from "enzyme"
import Question from "../../src/components/Question"

describe("Question", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Question
        question={"What is your camp like?"}
      />
    )
  })

  it("should render a Question component that has an h5 with question text", () => {
    expect(wrapper.find("h5")).toBeDefined()
    expect(wrapper.find("h5").text()).toEqual("What is your camp like?")
  })
})
