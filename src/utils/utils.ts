import { isFlashcardData, isQuizData } from './typeguards';

export const createStyledButton = (
  parentEl: Element,
  label: string,
  matIcon: string,
  classes?: string[],
  styles?: string[]
) => {
  const buttonWrapper = document.createElement('div');
  buttonWrapper.innerHTML = `<button style='${
    styles ? styles.join(' ') : ''
  } border-color: #37383B'
  _ngcontent-ng-c2304399035=""
  aria-label="Copy JSON"
  mat-stroked-button=""
  class="mdc-button mat-mdc-button-base feedback-button mdc-button--outlined mat-mdc-outlined-button mat-unthemed ${
    classes ? classes.join(' ') : ''
  }"
  mat-ripple-loader-class-name="mat-mdc-button-ripple"
>
  <span class="mat-mdc-button-persistent-ripple mdc-button__ripple"></span
  ><mat-icon
    _ngcontent-ng-c16875709=""
    role="img"
    aria-hidden="true"
    class="mat-icon notranslate material-symbols-outlined google-symbols mat-icon-no-color"
    data-mat-icon-type="font"
    >${matIcon}</mat-icon
  >${
    label.length
      ? `<span class="mdc-button__label">${label}</span><span class="mat-focus-indicator"></span>`
      : ''
  }<span class="mat-mdc-button-touch-target" style="cursor: pointer"></span
  ><span class="mat-ripple mat-mdc-button-ripple"></span>
</button>
`;
  const button = buttonWrapper.firstElementChild;
  if (!button) throw new Error('button creation failed');
  parentEl.appendChild(button);
  return button as HTMLElement;
};

export const createCsvBlob = (data: string): Blob | undefined => {
  const parsedData = JSON.parse(data);

  let rows: string[] = [];

  function escapeCsvField(field: string) {
    const escaped = field.replace(/"/g, '""');
    if (/[\t\n"]/.test(escaped)) {
      return `"${escaped}"`;
    }
    return escaped;
  }

  if (isFlashcardData(parsedData)) {
    for (const card of parsedData.flashcards) {
      const front = escapeCsvField(card.f);
      const back = escapeCsvField(card.b);
      rows.push(`${front}\t${back}`);
    }
  }

  if (isQuizData(parsedData)) {
    for (const quiz of parsedData.quiz) {
      const answer = quiz.answerOptions.find((opt) => opt.isCorrect);
      if (!answer) continue;
      const question = escapeCsvField(quiz.question);
      const correct = escapeCsvField(answer.text);
      rows.push(`${question}\t${correct}`);
    }
  }

  const csv = rows.join('\n');
  const BOM = '\uFEFF'; // UTF-8
  return new Blob([BOM + csv], { type: 'text/csv;charset=utf-8' });
};
