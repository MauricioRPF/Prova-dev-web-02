import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChartComponent = ({ data }) => {
  return (
    <div className="mb-4 p-3 border rounded" style={{ height: '400px' }}>
      <h4>Distribuição por Categoria</h4>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`${value} pontos`, 'Popularidade']}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <Bar 
            dataKey="value" 
            fill="#4CAF50" 
            name="Popularidade"
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;