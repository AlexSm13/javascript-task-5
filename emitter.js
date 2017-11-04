/* eslint-disable linebreak-style */
'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
getEmitter.isStar = true;
module.exports = getEmitter;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    return {
        events: {},

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (event, context, handler) {
            if (!this.events.hasOwnProperty(event)) {
                this.events[event] = [];
            }

            this.events[event].push({
                studentContext: context,
                action: handler.bind(context)
            });

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            Object.keys(this.events)
                .filter(function (nameEvent) {
                    return nameEvent === event;
                })
                .forEach(name => {
                    this.events[name] = this.events[name].filter(function (handler) {
                        return handler.studentContext !== context;
                    });
                });

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            let namesEvent = event.split('.');

            while (namesEvent.length > 0) {
                let name = namesEvent.join('.');
                if (this.events.hasOwnProperty(name)) {
                    this.events[name].forEach(function (handler) {
                        handler.action();
                    });
                }
                namesEvent.pop();
            }

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         * @returns {Object}
         */
        several: function (event, context, handler, times) {
            if (times > 0) {
                return this.on(event, context, function () {
                    if (times > 0) {
                        handler.call(context);
                    }
                    times--;
                });
            }

            return this.on(event, context, handler);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         * @returns {Object}
         */
        through: function (event, context, handler, frequency) {
            let countEvents = 0;

            if (frequency > 0) {
                return this.on(event, context, function () {
                    if (countEvents % frequency === 0) {
                        handler.call(context);
                    }
                    countEvents++;
                });
            }

            return this.on(event, context, handler);
        }
    };
}
