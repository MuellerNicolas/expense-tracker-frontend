// Ausgelagerte Funktion zur Validierung der Eingaben in Ausgabe und Budgets, um das DRY-Prinzip einzuhalten
export default function (formField: any): string {
  if (formField.hasError('required')) return 'Pflichtfeld';
  if (
    formField.hasError('min') &&
    formField.control.errors.min.actual < formField.control.errors.min.min
  ) {
    return 'Der Wert darf nicht negativ sein';
  }
  return '';
}
