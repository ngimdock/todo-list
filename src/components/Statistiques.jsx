

const Statistiques = ({totalTask, completedTask}) => {

	return (
		<div className="statistiques">
          <p>Nombres de taches totales : {totalTask}</p>
          <p>Nombres de taches Termine : {completedTask}</p>
          <p>Nombres de taches restante : {totalTask-completedTask}</p>
        </div>
	);
};

export default Statistiques;