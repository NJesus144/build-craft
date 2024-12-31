import {
  TooltipContent,
  TooltipProvider,
  Tooltip as TooltipRoot,
  TooltipTrigger,
} from './primitive'

interface TooltipProps {
  children: React.ReactNode
  content: string | number | React.ReactNode
}

export const Tooltip = ({ children, content }: TooltipProps) => {
  return (
    <TooltipProvider>
      <TooltipRoot delayDuration={300}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  )
}
