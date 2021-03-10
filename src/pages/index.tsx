
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/pages/Session.module.css';

export default function Session() {
  const { push } = useRouter();
  const [username, setUsername] = useState('');

  function handleUserSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    username && push(`/${username}`);
  }

  return (
    <div id={styles.body}>
      <section className={styles.leftContainer}>
        <img src="/background-login.svg" alt="Move.it background" />
      </section>

      <section className={styles.rightContainer}>
        <div>
          <img src="white-logo.png" alt="Move.it" />

          <div className={styles.groupInfo}>
            <h2>Bem-vindo</h2>

            <div>
              <img src="/icons/github.svg" alt="Entre com o seu github" />
              <p>Faça login com seu username do github</p>
            </div>
          </div>

          <form 
            onSubmit={handleUserSubmit}
            className={styles.groupInput}
            >
            <input
              type="text"
              placeholder="Digite seu username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <button type="submit">
              <img src="/icons/arrow-left.svg" alt="Entrar" />
            </button>
          </form>

        </div>
      </section>
    </div>
  );
}