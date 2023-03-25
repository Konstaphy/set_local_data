import axios, { AxiosResponse } from "axios"
import { useState, useMemo } from "react"
import "./app.css"

export function App() {
  const [event, setEvent] = useState<string>("")
  const [result, setResult] = useState<string>("")
  const [status, setStatus] = useState<string>("")

  const onSend = () => {
    axios
      .post<unknown, AxiosResponse<{ sum: number }>>(
        "http://127.0.0.1:8080/data/",
        { description: event, priority: result },
        { withCredentials: true },
      )
      .then((res) => {
        setStatus("Все хорошо, Всего: " + res.data.sum)
      })
      .catch(() => setStatus("Все плохо!!!!!!!!!!! Напишите пж"))
  }

  const isDisabled = useMemo(() => {
    if (!result || !event) {
      return true
    }
    if (parseFloat(result) < 0 || parseFloat(result) > 10) {
      console.log(parseFloat(result))
      return true
    }
    return !event.length
  }, [event, result])

  return (
    <div className="app">
      <div className="event">
        <input
          type={"text"}
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          placeholder={"Событие"}
        />
      </div>
      <div className={"result"}>
        <input
          value={result}
          onChange={(e) => setResult(e.target.value)}
          placeholder={"Результат (число 0-10)"}
          type={"text"}
        />
      </div>
      <button disabled={isDisabled} onClick={onSend}>
        <p>Отправить</p>
        {status && <p className={"additional"}>{status}</p>}
      </button>
    </div>
  )
}
