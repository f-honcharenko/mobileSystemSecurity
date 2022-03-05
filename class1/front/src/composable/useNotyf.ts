import { Notyf } from 'notyf'
import { themeColors } from '../utils/themeColors'

const defaultDuration: number = 2000
const notyf = new Notyf({
  duration: defaultDuration,
  position: {
    x: 'right',
    y: 'bottom',
  },
  types: [
    {
      type: 'warning',
      background: themeColors.warning,
      icon: {
        className: 'fas fa-hand-paper',
        tagName: 'i',
        text: '',
      },
    },
    {
      type: 'info',
      background: themeColors.info,
      icon: {
        className: 'fas fa-info-circle',
        tagName: 'i',
        text: '',
      },
    },
    {
      type: 'primary',
      background: themeColors.primary,
      icon: {
        className: 'fas fa-car-crash',
        tagName: 'i',
        text: '',
      },
    },
    {
      type: 'accent',
      background: themeColors.accent,
      icon: {
        className: 'fas fa-car-crash',
        tagName: 'i',
        text: '',
      },
    },
    {
      type: 'purple',
      background: themeColors.purple,
      icon: {
        className: 'fas fa-check',
        tagName: 'i',
        text: '',
      },
    },
    {
      type: 'blue',
      background: themeColors.blue,
      icon: {
        className: 'fas fa-check',
        tagName: 'i',
        text: '',
      },
    },
    {
      type: 'green',
      background: themeColors.green,
      icon: {
        className: 'fas fa-check',
        tagName: 'i',
        text: '',
      },
    },
    {
      type: 'orange',
      background: themeColors.orange,
      icon: {
        className: 'fas fa-check',
        tagName: 'i',
        text: '',
      },
    },
  ],
})

export default function useNotyf() {
  return {
    success: (message: string, duration?: number | null) => {
      notyf.success({ 
        message,
        duration: duration || defaultDuration 
      })
    },
    error: (message: string, duration?: number | null) => {
      notyf.error({ 
        message,
        duration: duration || defaultDuration 
      })
    },
    info: (message: string, duration?: number | null) => {
      notyf.open({
        type: 'info',
        message,
        duration: duration || defaultDuration
      })
    },
    warning: (message: string, duration?: number | null) => {
      notyf.open({
        type: 'warning',
        message,
        duration: duration || defaultDuration
      })
    },
    primary: (message: string, duration?: number | null) => {
      notyf.open({
        type: 'primary',
        message,
        duration: duration || defaultDuration
      })
    },
    purple: (message: string, duration?: number | null) => {
      notyf.open({
        type: 'purple',
        message,
        duration: duration || defaultDuration
      })
    },
    blue: (message: string, duration?: number | null) => {
      notyf.open({
        type: 'blue',
        message,
        duration: duration || defaultDuration
      })
    },
    green: (message: string, duration?: number | null) => {
      notyf.open({
        type: 'green',
        message,
        duration: duration || defaultDuration
      })
    },
    orange: (message: string, duration?: number | null) => {
      notyf.open({
        type: 'orange',
        message,
        duration: duration || defaultDuration
      })
    },
  }
}