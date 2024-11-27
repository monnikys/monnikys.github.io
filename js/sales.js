// Dados simulados de vendas
let salesData = [
    { protocolo: 1, nome: "João", telefone: "123456789", endereco: "Rua A", bairro: "Centro", data_venda: "26/01/2024", tipo: "Sakura Blossom Blend", valorTotal: 50.00 },
    { protocolo: 2, nome: "Maria", telefone: "987654321", endereco: "Rua B", bairro: "Bairro X", data_venda: "10/02/2024", tipo: "Matcha Misto", valorTotal: 30.00 },
    { protocolo: 3, nome: "Carlos", telefone: "123456789", endereco: "Rua C", bairro: "Bairro Y", data_venda: "15/01/2024", tipo: "Geisha Gold Reserve", valorTotal: 60.00 },
    { protocolo: 4, nome: "Ana", telefone: "112233445", endereco: "Rua D", bairro: "Bairro Z", data_venda: "10/03/2024", tipo: "Hojicha Haze", valorTotal: 40.00 },
    { protocolo: 5, nome: "Lucas", telefone: "223344556", endereco: "Rua E", bairro: "Centro", data_venda: "21/01/2024", tipo: "Sakura Blossom Blend", valorTotal: 55.00 },
    { protocolo: 6, nome: "Patrícia", telefone: "334455667", endereco: "Rua F", bairro: "Bairro W", data_venda: "05/02/2024", tipo: "Yuzu Citrus Surprise", valorTotal: 75.00 },
    { protocolo: 7, nome: "Ricardo", telefone: "445566778", endereco: "Rua G", bairro: "Bairro V", data_venda: "12/03/2024", tipo: "Kabuki Kona Reserve", valorTotal: 90.00 },
    { protocolo: 8, nome: "Fernanda", telefone: "556677889", endereco: "Rua H", bairro: "Bairro T", data_venda: "18/02/2024", tipo: "Umeboshi Café", valorTotal: 45.00 },
    { protocolo: 9, nome: "Felipe", telefone: "667788990", endereco: "Rua I", bairro: "Centro", data_venda: "22/01/2024", tipo: "Rising Sun Roasters", valorTotal: 50.00 },
    { protocolo: 10, nome: "Juliana", telefone: "778899001", endereco: "Rua J", bairro: "Bairro S", data_venda: "03/02/2024", tipo: "Nadeshiko Coffee", valorTotal: 35.00 },
    { protocolo: 11, nome: "Gustavo", telefone: "889900112", endereco: "Rua K", bairro: "Bairro R", data_venda: "26/02/2024", tipo: "Kitsune Kafe", valorTotal: 80.00 },
    { protocolo: 12, nome: "Juliana", telefone: "990011223", endereco: "Rua L", bairro: "Centro", data_venda: "04/03/2024", tipo: "Shizuku Coffee Roastery", valorTotal: 50.00 },
    { protocolo: 13, nome: "Roberta", telefone: "101112131", endereco: "Rua M", bairro: "Bairro U", data_venda: "15/01/2024", tipo: "Tsuki no Kissa", valorTotal: 65.00 }
];

document.addEventListener("DOMContentLoaded", function() {
    updateData();
});

// Carrega os dados das vendas na tabela
function loadSalesData() {
    const salesTable = document.getElementById("sales-data");
    let totalSales = 0;
    salesTable.innerHTML = ''; // Limpa a tabela antes de carregar os novos dados

    salesData.forEach(sale => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${sale.protocolo}</td>
            <td>${sale.nome}</td>
            <td>${sale.telefone}</td>
            <td>${sale.endereco}</td>
            <td>${sale.bairro}</td>
            <td>${sale.data_venda}</td>
            <td>${sale.tipo}</td>
            <td>R$ ${sale.valorTotal.toFixed(2)}</td>
        `;
        salesTable.appendChild(row);
        totalSales += sale.valorTotal;
    });

    document.getElementById("total-sales").textContent = `R$ ${totalSales.toFixed(2)}`;
}

// Desenha os gráficos
function drawCharts() {
    drawLineChart();
    drawPieChartTipo();
    drawBarStackedChart();
}

// Desenha o gráfico de linha de vendas mensais
function drawLineChart() {
    const ctxLine = document.getElementById('line-chart').getContext('2d');
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    // Calcula as vendas mensais
    const salesByMonth = months.map(month => {
        return salesData.filter(sale => new Date(sale.data_venda).toLocaleString('default', { month: 'long' }) === month).reduce((acc, sale) => acc + sale.valorTotal, 0);
    });

    new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Vendas Mensais',
                data: salesByMonth,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: { responsive: true }
    });
}

// Desenha o gráfico de pizza com os tipos de café
function drawPieChartTipo() {
    const ctxPie = document.getElementById('pie-chart-tipo').getContext('2d');
    const tipos = [...new Set(salesData.map(sale => sale.tipo))]; // Obtém os tipos únicos
    const salesByType = tipos.map(tipo => {
        return salesData.filter(sale => sale.tipo === tipo).reduce((acc, sale) => acc + sale.valorTotal, 0);
    });

    new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: tipos,
            datasets: [{
                data: salesByType,
                backgroundColor: ['rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(255, 159, 64, 0.7)', 'rgba(75, 192, 192, 0.7)', 'rgba(153, 102, 255, 0.7)', 'rgba(255, 159, 64, 0.7)']
            }]
        },
        options: { responsive: true }
    });
}

// Desenha o gráfico de barras empilhadas por tipo de café e mês
function drawBarStackedChart() {
    const ctxBar = document.getElementById('bar-stacked-chart').getContext('2d');
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    // Organiza os dados para o gráfico empilhado
    const salesByTypeAndMonth = [...new Set(salesData.map(sale => sale.tipo))].map(tipo => {
        return {
            label: tipo,
            data: meses.map(month => {
                return salesData.filter(sale => new Date(sale.data_venda).toLocaleString('default', { month: 'long' }) === month && sale.tipo === tipo)
                    .reduce((acc, sale) => acc + sale.valorTotal, 0);
            }),
            backgroundColor: 'rgba(54, 162, 235, 0.7)'
        };
    });

    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: meses,
            datasets: salesByTypeAndMonth
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: { x: { stacked: true }, y: { stacked: true } }
        }
    });
}

// Atualiza os dados e os gráficos
function updateData() {
    loadSalesData();
    drawCharts();
}

function savePDF() {
    const element = document.body;  // Você pode selecionar qualquer elemento HTML que queira salvar
    html2pdf(element);
}

function printPage() {
    window.print();
}
