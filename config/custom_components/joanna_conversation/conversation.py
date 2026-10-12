"""Use Joanna's existing human agent as an Assist conversation entity."""

from homeassistant.components import conversation
from homeassistant.components.conversation import AssistantContent, ChatLog, ConversationInput
from homeassistant.helpers import intent
from homeassistant.helpers.entity import DeviceInfo

from . import DOMAIN
from .client import JoannaError


async def async_setup_entry(hass, entry, async_add_entities):
    async_add_entities([JoannaConversation(entry)])


class JoannaConversation(conversation.ConversationEntity):
    """Return the same Joanna answer to the satellite's TTS and overlay."""

    _attr_has_entity_name = True
    _attr_name = None
    _attr_supported_features = conversation.ConversationEntityFeature.CONTROL

    def __init__(self, entry):
        self.entry = entry
        self._attr_unique_id = entry.unique_id
        self._attr_device_info = DeviceInfo(identifiers={(DOMAIN, entry.unique_id)}, name=entry.title, manufacturer="Joanna", model="Assist bridge")

    @property
    def supported_languages(self):
        return "*"

    async def _async_handle_message(self, user_input: ConversationInput, chat_log: ChatLog):
        response = intent.IntentResponse(language=user_input.language)
        try:
            result = await self.entry.runtime_data.converse(user_input.text, user_input.device_id)
            answer = result["text"]
            success = result["success"]
        except JoannaError as error:
            answer = str(error)
            success = False
        chat_log.async_add_assistant_content_without_tools(AssistantContent(agent_id=user_input.agent_id, content=answer))
        if success:
            response.async_set_speech(answer)
        else:
            response.async_set_error(intent.IntentResponseErrorCode.FAILED_TO_HANDLE, answer)
        return conversation.ConversationResult(
            response=response, conversation_id=chat_log.conversation_id,
            continue_conversation=success,
        )
