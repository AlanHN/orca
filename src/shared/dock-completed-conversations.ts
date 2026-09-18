export type DockCompletedConversation = {
  id: string
  label: string
}

export const DOCK_CONVERSATIONS_UPDATE = 'app:setDockCompletedConversations'
export const DOCK_CONVERSATION_OPEN = 'app:openDockCompletedConversation'

export function readDockCompletedConversations(value: unknown): DockCompletedConversation[] {
  if (!Array.isArray(value)) {
    throw new Error('Invalid Dock conversations')
  }
  const ids = new Set<string>()
  return value.map((item: unknown) => {
    if (
      typeof item !== 'object' ||
      item === null ||
      !('id' in item) ||
      typeof item.id !== 'string' ||
      !item.id ||
      item.id.length > 8192 ||
      !('label' in item) ||
      typeof item.label !== 'string' ||
      !item.label ||
      item.label.length > 240 ||
      ids.has(item.id)
    ) {
      throw new Error('Invalid Dock conversation')
    }
    ids.add(item.id)
    return { id: item.id, label: item.label.replace(/[\r\n\t]/g, ' ') }
  })
}
