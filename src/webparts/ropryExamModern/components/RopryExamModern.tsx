import * as React from "react";
import styles from "./RopryExamModern.module.scss";
import { IRopryExamModernProps } from "./IRopryExamModernProps";
import { IRopryExamModernState } from "./IRopryExamModernProps";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export default class RopryExamModern extends React.Component<
  IRopryExamModernProps,
  IRopryExamModernState
> {
  public query: any;
  public constructor(props) {
    super(props);
    this.state = {
      players: [],
    };
    this.query = sp.web.lists.getByTitle("FootballPlayers").items;
  }

  public async componentDidMount() {
    sp.setup({
      spfxContext: this.props.context,
    });
    try {
      const players: any[] = await this.query.get(); // отримуємо всіх гравців по тайтлу FootballPlayers

      this.setState({ players }); // записуємо масив гравців в state
    } catch (error) {
      console.log("error in get Players", error);
    }
  }

  public addNewPlayer = async () => {
    try {
      const res: any = await this.query.add({
        Title: "Default Player",
        OData__x0424__x043e__x0442__x043e_: {
          Description:
            "https://www.telegraph.co.uk/content/dam/football/spark/FootballIndex/footballer-kicking-ball-on-pitch-xlarge.jpg",
          Url:
            "https://www.telegraph.co.uk/content/dam/football/spark/FootballIndex/footballer-kicking-ball-on-pitch-xlarge.jpg",
        },
      }); // додаємо об'єкт з новим гравцем
      this.setState((prevState) => ({
        players: [...prevState.players, res.data],
      })); // оновлюємо state новим об'єктом
    } catch (error) {
      console.log("error in add Player", error);
    }
  }; // tslint:disable-line

  public render(): React.ReactElement<IRopryExamModernProps> {
    const { players } = this.state;
    return (
      <div>
        <ul className={styles.list}>
          {players &&
            players.length > 0 &&
            players.map((el) => (
              <li key={el.Id} className={styles.item}>
                <a
                  href={
                    el.OData__x0424__x043e__x0442__x043e_
                      ? el.OData__x0424__x043e__x0442__x043e_.Url
                      : ""
                  }
                  target="_blank"
                >
                  <img
                    src={
                      el.OData__x0424__x043e__x0442__x043e_
                        ? el.OData__x0424__x043e__x0442__x043e_.Url
                        : ""
                    }
                    alt="player"
                    className={styles.itemImage}
                  />
                </a>
                <p className={styles.paragraph}>
                  <span className={styles.mainText}>{el.Title}: </span>{" "}
                  <span className={styles.text}>
                    On transer:
                    {el.OData__x041d__x0430__x0020__x0442__x04 ? " Yes" : " No"}
                  </span>
                  <span className={styles.text}>
                    Age:
                    {el.OData__x0412__x043e__x0437__x0440__x04}
                  </span>
                </p>
              </li>
            ))}
        </ul>
        <button onClick={this.addNewPlayer} className={styles.button}>
          Add default player
        </button>
      </div>
    );
  }
}
