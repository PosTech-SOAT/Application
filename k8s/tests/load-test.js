import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
	stages: [
		{ duration: '100s', target: 100 }, // {Duração, Usuários virtuais}
		{ duration: '100s', target: 50 },
	],
};

export default function () {
	let response = http.get('http://localhost:3000/api/clients');

	// Verifica se a resposta possui o status 200
	check(response, {
		'status is 200': (r) => r.status === 200,
	});

	sleep(1); // Aguarda 1 segundo entre as requisições (pode ser ajustado conforme necessário)
}
