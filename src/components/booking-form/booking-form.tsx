import { useForm } from 'react-hook-form';
import { useState, ChangeEvent, useEffect } from 'react';
import { QuestFull, infoBookingQuest } from '../../types/types';
import { fetchBookQuest } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getBookingQuestStatus, getErrorBookingQuestStatus } from '../../store/reservation-slice/selectors';
import ErrorSending from '../error-sending/error-sending';

type BookingSlote = {
  time: string;
  isAvailable: boolean;
}

type BookingForm = {
  today: BookingSlote;
  tomorrow: BookingSlote;
}

type BookingFormProps = {
  quest: QuestFull;
  quests: infoBookingQuest[];
  selectedQuest?: infoBookingQuest;
}

type FormInputs = {
  name: string;
  tel: string;
  person: number;
  children: boolean;
}

function BookingForm({ quest, quests, selectedQuest }: BookingFormProps): JSX.Element {

  if (!selectedQuest) {
    selectedQuest = quests[0];
  }

  const { slots } = selectedQuest;

  const { today, tomorrow } = slots;

  const dispatch = useAppDispatch();

  const isBookingQuest = useAppSelector(getBookingQuestStatus);

  const hasError = useAppSelector(getErrorBookingQuestStatus);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid
    },
  } = useForm<FormInputs>({
    mode: 'onBlur'
  });

  const [slotBooking, setSlotBooking] = useState<BookingForm>({
    today: { time: '', isAvailable: false },
    tomorrow: { time: '', isAvailable: false }
  });

  function handleSlotTodayTimeChange(evt: ChangeEvent<HTMLInputElement>) {
    setSlotBooking({
      ...slotBooking,
      today: { time: evt.target.value, isAvailable: evt.target.checked },
      tomorrow: { time: '', isAvailable: true }
    });
  }

  function handleSlotTomorrowTimeChange(evt: ChangeEvent<HTMLInputElement>) {
    setSlotBooking({
      ...slotBooking,
      today: { time: '', isAvailable: true },
      tomorrow: { time: evt.target.value, isAvailable: evt.target.checked }
    });
  }

  function resetSlotTime() {
    setSlotBooking({
      today: { time: '', isAvailable: true },
      tomorrow: { time: '', isAvailable: true }
    });
  }

  useEffect(() => {
    resetSlotTime();
  }, [selectedQuest]);

  function handleFormSubmit(data: FormInputs) {
    dispatch(fetchBookQuest({
      id: quest.id, data: {
        date: slotBooking.today.time ? 'today' : 'tomorrow',
        time: slotBooking.today.time ? slotBooking.today.time : slotBooking.tomorrow.time,
        contactPerson: data.name,
        phone: data.tel,
        withChildren: data.children,
        peopleCount: +data.person,
        placeId: selectedQuest?.id ?? quests[0].id
      }
    }));
  }

  const regexPeopleCount = `[${quest.peopleMinMax[0]}-${quest.peopleMinMax[1]}]`;

  return (
    <form className="booking-form" action="https://echo.htmlacademy.ru/" method="post"
      onSubmit={(event) =>
        void handleSubmit(handleFormSubmit)(event)}
    >
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Выбор даты и времени</legend>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Сегодня</legend>
          <div className="booking-form__date-inner-wrapper">
            {today.map((slot) => (
              <label key={slot.time} className="custom-radio booking-form__date">
                <input
                  type="radio"
                  id={`today${slot.time}`}
                  name="date"
                  required
                  value={`${slot.time}`}
                  disabled={slot.isAvailable === false}
                  onChange={handleSlotTodayTimeChange}
                  checked={slotBooking?.today?.time === slot.time}
                />
                <span className="custom-radio__label">{slot.time}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Завтра</legend>
          <div className="booking-form__date-inner-wrapper">
            {tomorrow.map((slot) => (
              <label key={slot.time} className="custom-radio booking-form__date">
                <input
                  type="radio"
                  id={`tomorrow${slot.time}`}
                  name="date"
                  required
                  value={slot.time}
                  disabled={slot.isAvailable === false}
                  onChange={handleSlotTomorrowTimeChange}
                  checked={slotBooking?.tomorrow?.time === slot.time}
                />
                <span
                  className="custom-radio__label"
                >{slot.time}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </fieldset>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Контактная информация</legend>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="name">Ваше имя</label>
          <input
            type="text"
            id="name"
            placeholder="Имя"
            {...register('name', {
              required: 'Укажите имя',
              pattern: {
                value: /(?=^.{1,15}$)[А-Яа-яЁёA-Za-z'-]{1,}/,
                message: 'Введите корректное имя'
              }
            })}
          />
          <div style={{ color: '#994a4a' }}>
            {errors?.name && <p>{errors?.name.message || 'Некорректные данные'}</p>}
          </div>
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
          <input
            type="tel"
            id="tel"
            placeholder="Телефон"
            {...register('tel', {
              required: 'Укажите номер телефона',
              pattern: {
                value: /^\+7[ ]?(\(?\d{3}\)?[ ]?)?[\d ]{7,10}/,
                message: 'Введите корректный номер телефона'
              }
            })}
          />
          <div style={{ color: '#994a4a' }}>
            {errors?.tel && <p>{errors?.tel.message || 'Некорректные данные'}</p>}
          </div>
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="person">Количество участников</label>
          <input
            type="number"
            id="person"
            placeholder="Количество участников"
            {...register('person', {
              required: 'Укажите количество участников',
              pattern: {
                value: new RegExp(`(?=^.{1}$)${regexPeopleCount}`),
                message: `Допустимое количество участников от ${quest.peopleMinMax[0]} до ${quest.peopleMinMax[1]}`
              }
            })}
          />
          <div style={{ color: '#994a4a' }}>
            {errors?.person && <p>{errors?.person.message || 'Некорректные данные'}</p>}
          </div>
        </div>
        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input
            type="checkbox"
            id="children"
            {...register('children')}
          >
          </input>
          <span className="custom-checkbox__icon">
            <svg width="20" height="17" aria-hidden="true">
              <use xlinkHref="#icon-tick"></use>
            </svg>
          </span><span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
        </label>
      </fieldset>
      <button className="btn btn--accent btn--cta booking-form__submit" type="submit" disabled={!isValid || isBookingQuest}>{isBookingQuest ? 'Бронируем...' : 'Забронировать'}</button>
      {hasError && <ErrorSending></ErrorSending>}
      <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
        <input type="checkbox" id="id-order-agreement" name="user-agreement" required />
        <span
          className="custom-checkbox__icon"
        >
          <svg width="20" height="17" aria-hidden="true">
            <use xlinkHref="#icon-tick"></use>
          </svg>
        </span>
        <span className="custom-checkbox__label">Я&nbsp;согласен с
          <a className="link link--active-silver link--underlined" href="#">правилами обработки персональных
            данных
          </a>&nbsp;и пользовательским соглашением
        </span>
      </label>
    </form>
  );
}

export default BookingForm;
