const { exec } = require("node:child_process");

let count = 0;
const spinner = ["🕛", "🕑", "🕒", "🕓", "🕕", "🕖", "🕘", "🕙"];

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout, stderr) {
    if (stdout.search("accepting connections") === -1) {
      const frameIndex = count % spinner.length;
      process.stdout.write(
        `\r${spinner[frameIndex]} Aguardando Postgres aceitar conexões`,
      );

      count++;
      setTimeout(checkPostgres, 100);
      return;
    }

    console.log("\n🟢 Postgres está pronto e aceitando conexões\n");
  }
}

console.log("\n\n🔴 Aguardando Postgres aceitar conexões");
checkPostgres();
