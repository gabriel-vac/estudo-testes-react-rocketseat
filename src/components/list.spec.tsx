import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import List from "./List";

describe("List Component", () => {
  it("should render list items", () => {
    const { getByText, queryByText, rerender } = render(
      <List initialitems={["Diego", "Gabriel", "Gustavo"]} />
    );

    expect(getByText("Diego")).toBeInTheDocument();
    expect(getByText("Gabriel")).toBeInTheDocument();
    expect(getByText("Gustavo")).toBeInTheDocument();
  });

  it("should to be able to add new item to the list", async () => {
    const { getByText, getByPlaceholderText, findByText } = render(
      <List initialitems={[]} />
    );

    const addButton = getByText("adicionar");
    const inputElement = getByPlaceholderText("Novo item");

    // debug();

    const user = userEvent.setup();

    await user.type(inputElement, "Novo");
    await user.click(addButton);

    // debug();

    // expect(getByText("Novo")).toBeInTheDocument();
    expect(await findByText("Novo")).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText("Novo")).toBeInTheDocument(); // não preciso usar o findBy com o waitFor
    });
  });

  it("should to be able to remove an item from the list", async () => {
    const { getAllByText, queryByText } = render(
      <List initialitems={["Diego"]} />
    );

    const removeButtons = getAllByText("remover");

    userEvent.click(removeButtons[0]);

    // await waitForElementToBeRemoved(() => {
    //   return getByText("Diego");
    // });

    // ou

    await waitFor(() => {
      expect(queryByText("Diego")).not.toBeInTheDocument();
    });
  });
});
