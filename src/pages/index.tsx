
import styles from '../styles/pages/Login.module.css';

export default function Login() {
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
              <p>Faça login com seu Github para começar</p>
            </div>
          </div>

          <div className={styles.groupInput}>
            <input type="text" placeholder="Digite seu username" />

            <button type="submit">
              <img src="/icons/arrow-left.svg" alt="Entrar" />
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}