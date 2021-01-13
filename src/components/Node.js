import React from "react";
import PropTypes from "prop-types";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator
} from "react-native";
import colors from "../constants/colors";
import { Paper, Subtitle, BodyText, Caption } from "material-bread";
import { Expander } from "./Expander";
import Status from "./Status";

const Block = ({ block }) => {
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,0.12)",
        paddingHorizontal: 6,
        paddingVertical: 8,
        marginTop: 4,
        borderRadius: 2
      }}
    >
      <View style={{}}>
        <Text
          style={{
            color: "#304FFE",
            fontWeight: "bold",
            fontSize: 12,
            marginBottom: 10
          }}
        >
          {block.id.padStart(3, "0")}
        </Text>
        <Text style={{ color: "#263238", fontSize: 16 }}>{block.text}</Text>
      </View>
    </View>
  );
};

Block.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  }).isRequired
};

const Node = ({ node, expanded, toggleNodeExpanded }) => (
  <TouchableOpacity onPress={() => toggleNodeExpanded(node)}>
    <Paper elevation={2} style={styles.container}>
      <View style={styles.headingContainer}>
        <Subtitle
          type={6}
          text={node.name || "Unknown"}
          style={styles.heading}
        />
        <Status loading={node.loading} online={node.online} />
      </View>
      <Caption
        text={node.url}
        color={colors.gray}
        style={styles.secondaryHeading}
      />
      <Expander expanded={expanded} style={styles.icon(expanded)} />
      {expanded && (
        <View style={styles.heading}>
          {node.blocks.loading && <ActivityIndicator />}
          {!node.blocks.loading &&
            node.blocks.list.length > 0 &&
            node.blocks.list.map(block => (
              <Block
                block={{ id: block.id, text: block.attributes.data }}
                key={block.id}
              />
            ))}
          {!node.blocks.loading && node.blocks.list.length == 0 && (
            <BodyText type={1} text="No Blocks found" />
          )}
        </View>
      )}
    </Paper>
  </TouchableOpacity>
);

Node.propTypes = {
  node: PropTypes.shape({
    url: PropTypes.string,
    online: PropTypes.bool,
    name: PropTypes.string,
    loading: PropTypes.bool
  }).isRequired,
  expanded: PropTypes.bool,
  toggleNodeExpanded: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 30
  },
  heading: {
    marginTop: 5,
    color: colors.text
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingEnd: 30,
    alignItems: "center",
    width: "100%"
  },
  secondaryHeading: {
    marginTop: 5,
    color: colors.faded
  },
  icon: expanded => ({
    position: "absolute",
    top: expanded ? 10 : 20,
    right: 10
  })
});

export default Node;
